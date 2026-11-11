import JSZip from "jszip";

export type ImportedChapter = { id:string; title:string; sentences:string[] };
export type ImportedBook = { id:string; title:string; author:string; language:string; importedAt:string; chapters:ImportedChapter[] };
const DB_NAME="linguatales-library";
const STORE="books";

function openDb():Promise<IDBDatabase>{
  return new Promise((resolve,reject)=>{
    const request=indexedDB.open(DB_NAME,1);
    request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains(STORE))request.result.createObjectStore(STORE,{keyPath:"id"});};
    request.onsuccess=()=>resolve(request.result);
    request.onerror=()=>reject(request.error);
  });
}
export async function saveImportedBook(book:ImportedBook):Promise<void>{
  const db=await openDb();
  await new Promise<void>((resolve,reject)=>{
    const tx=db.transaction(STORE,"readwrite");
    tx.objectStore(STORE).put(book);
    tx.oncomplete=()=>resolve();
    tx.onerror=()=>reject(tx.error);
  });
  db.close();
}
export async function loadImportedBooks():Promise<ImportedBook[]>{
  const db=await openDb();
  const books=await new Promise<ImportedBook[]>((resolve,reject)=>{
    const request=db.transaction(STORE,"readonly").objectStore(STORE).getAll();
    request.onsuccess=()=>resolve(request.result as ImportedBook[]);
    request.onerror=()=>reject(request.error);
  });
  db.close();
  return books.sort((a,b)=>b.importedAt.localeCompare(a.importedAt));
}
function cleanText(value:string):string{return value.replace(/\\s+/g," ").trim();}
function splitSentences(text:string):string[]{
  const cleaned=cleanText(text);
  if(!cleaned)return [];
  return (cleaned.match(/[^.!?…]+(?:[.!?…]+["'»)]*)?/g)||[cleaned]).map(s=>s.trim()).filter(Boolean);
}
function localNameElements(root:Document,name:string):Element[]{
  return Array.from(root.getElementsByTagName("*")).filter(el=>el.localName.toLowerCase()===name.toLowerCase());
}
function joinPath(base:string,href:string):string{
  const parts=(base+href.split(/[?#]/)[0]).split("/");
  const out:string[]=[];
  for(const raw of parts){
    if(!raw||raw===".")continue;
    if(raw==="..")out.pop();
    else out.push(decodeURIComponent(raw));
  }
  return out.join("/");
}
export async function importEpub(file:File):Promise<ImportedBook>{
  if(!file.name.toLowerCase().endsWith(".epub"))throw new Error("Please choose an EPUB file.");
  const zip=await JSZip.loadAsync(file);
  const container=zip.file("META-INF/container.xml");
  if(!container)throw new Error("This EPUB is missing its container file.");
  const containerXml=new DOMParser().parseFromString(await container.async("text"),"application/xml");
  const rootfile=localNameElements(containerXml,"rootfile")[0];
  const opfPath=rootfile?.getAttribute("full-path");
  if(!opfPath)throw new Error("Could not find the EPUB package document.");
  const opfFile=zip.file(opfPath);
  if(!opfFile)throw new Error("The EPUB package document could not be opened.");
  const opf=new DOMParser().parseFromString(await opfFile.async("text"),"application/xml");
  const metadata=localNameElements(opf,"metadata")[0];
  const meta=(name:string)=>metadata?Array.from(metadata.getElementsByTagName("*")).find(el=>el.localName.toLowerCase()===name)?.textContent?.trim()||"":"";
  const title=meta("title")||file.name.replace(/\\.epub$/i,"");
  const author=meta("creator");
  const language=meta("language")||"und";
  const manifest=new Map<string,string>();
  for(const item of localNameElements(opf,"item")){
    const id=item.getAttribute("id");
    const href=item.getAttribute("href");
    const type=item.getAttribute("media-type")||"";
    if(id&&href&&(!type||type.includes("xhtml")||type.includes("html")))manifest.set(id,href);
  }
  const base=opfPath.includes("/")?opfPath.slice(0,opfPath.lastIndexOf("/")+1):"";
  const spine=localNameElements(opf,"itemref").map(item=>manifest.get(item.getAttribute("idref")||"")).filter((v):v is string=>Boolean(v));
  const chapters:ImportedChapter[]=[];
  for(const href of spine){
    const path=joinPath(base,href);
    const entry=zip.file(path)||zip.file(href);
    if(!entry)continue;
    const doc=new DOMParser().parseFromString(await entry.async("text"),"text/html");
    const blocks=Array.from(doc.querySelectorAll("h1,h2,h3,h4,p,li")).map(el=>cleanText(el.textContent||"")).filter(Boolean);
    const fallback=cleanText(doc.body?.textContent||"");
    const source=blocks.length?blocks:(fallback?[fallback]:[]);
    const chapterSentences=source.flatMap(splitSentences);
    if(chapterSentences.length)chapters.push({id:"chapter-"+(chapters.length+1),title:"Chapter "+(chapters.length+1),sentences:chapterSentences});
  }
  if(!chapters.length)throw new Error("No readable chapter text was found in this EPUB.");
  return{id:"epub-"+crypto.randomUUID(),title,author,language,importedAt:new Date().toISOString(),chapters};
}
