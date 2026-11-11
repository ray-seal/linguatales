import JSZip from "jszip";

export type ImportedChapter = { id:string; title:string; sentences:string[] };
export type ImportedBook = { id:string; title:string; author:string; language:string; importedAt:string; chapters:ImportedChapter[] };
const DB_NAME="linguatales-library"; const STORE="books";
function openDb():Promise<IDBDatabase>{return new Promise((resolve,reject)=>{const request=indexedDB.open(DB_NAME,1);request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains(STORE))request.result.createObjectStore(STORE,{keyPath:"id"});};request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});}
export async function saveImportedBook(book:ImportedBook):Promise<void>{const db=await openDb();await new Promise<void>((resolve,reject)=>{const tx=db.transaction(STORE,"readwrite");tx.objectStore(STORE).put(book);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);});db.close();}
export function getImportedBooks():ImportedBook[]{return [];}
export async function loadImportedBooks():Promise<ImportedBook[]>{const db=await openDb();const books=await new Promise<ImportedBook[]>((resolve,reject)=>{const request=db.transaction(STORE,"readonly").objectStore(STORE).getAll();request.onsuccess=()=>resolve(request.result as ImportedBook[]);request.onerror=()=>reject(request.error);});db.close();return books.sort((a,b)=>b.importedAt.localeCompare(a.importedAt));}
function cleanText(value:string):string{return value.replace(/\s+/g," ").trim();}
function splitSentences(text:string):string[]{const cleaned=cleanText(text);if(!cleaned)return[];const segments=cleaned.match(/[^.!?…]+(?:[.!?…]+["'»)]*)?/g)||[cleaned];return segments.map(s=>s.trim()).filter(Boolean);}
export async function importEpub(file:File):Promise<ImportedBook>{
 if(!file.name.toLowerCase().endsWith(".epub"))throw new Error("Please choose an EPUB file.");
 const zip=await JSZip.loadAsync(file);const container=zip.file("META-INF/container.xml");if(!container)throw new Error("This EPUB is missing its container file.");
 const containerXml=new DOMParser().parseFromString(await container.async("text"),"application/xml");const opfPath=containerXml.querySelector("rootfile")?.getAttribute("full-path");if(!opfPath)throw new Error("Could not find the EPUB package document.");
 const opfFile=zip.file(opfPath);if(!opfFile)throw new Error("The EPUB package document could not be opened.");
 const opf=new DOMParser().parseFromString(await opfFile.async("text"),"application/xml");const title=opf.querySelector("metadata title, dc\\:title")?.textContent?.trim()||file.name.replace(/\.epub$/i,"");const author=opf.querySelector("metadata creator, dc\\:creator")?.textContent?.trim()||"";const language=opf.querySelector("metadata language, dc\\:language")?.textContent?.trim()||"und";
 const manifest=new Map<string,string>();opf.querySelectorAll("manifest item").forEach(item=>{const id=item.getAttribute("id"),href=item.getAttribute("href"),type=item.getAttribute("media-type");if(id&&href&&(!type||type.includes("xhtml")||type.includes("html")))manifest.set(id,new URL(href,"https://epub.invalid/"+opfPath).pathname.replace(/^\//,""));});
 const base=opfPath.includes("/")?opfPath.slice(0,opfPath.lastIndexOf("/")+1):"";const spine=Array.from(opf.getElementsByTagName("*")).filter(el=>el.localName==="itemref"&&el.parentElement?.localName==="spine").map(item=>manifest.get(item.getAttribute("idref")||"")).filter(Boolean);
 const chapters:ImportedChapter[]=[];for(let i=0;i<spine.length;i++){const path=joinPath(base,spine[i]);const entry=zip.file(path)||zip.file(spine[i]);if(!entry)continue;const doc=new DOMParser().parseFromString(await entry.async("text"),"text/html");const blocks=Array.from(doc.querySelectorAll("h1,h2,h3,h4,p,li")).map(el=>cleanText(el.textContent||"")).filter(t=>t.length>0);const fallback=cleanText(doc.body?.textContent||"");const source=blocks.length?blocks:fallback?[fallback]:[];const sentences=source.flatMap(splitSentences);if(sentences.length)chapters.push({id:"chapter-"+(chapters.length+1),title:"Chapter "+(chapters.length+1),sentences});}
 if(!chapters.length)throw new Error("No readable chapter text was found in this EPUB.");
 return{id:"epub-"+crypto.randomUUID(),title,author,language,importedAt:new Date().toISOString(),chapters};
}
