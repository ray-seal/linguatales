export type Word={id:string,fr:string,en:string,pron:string,gender?:string,note?:string};
export const words:Word[]=[
{id:"bear",fr:"un ours",en:"a bear",pron:"uhn oors",gender:"masculine",note:"The plural is des ours. The final s is silent."},
{id:"house",fr:"une maison",en:"a house",pron:"ewn meh-zohn",gender:"feminine"},
{id:"porridge",fr:"du porridge",en:"some porridge",pron:"dew por-rij",note:"Bouillie is another French word for porridge or mush."},
{id:"chair",fr:"une chaise",en:"a chair",pron:"ewn shez",gender:"feminine"},
{id:"bed",fr:"un lit",en:"a bed",pron:"uhn lee",gender:"masculine"},
{id:"woods",fr:"la forêt",en:"the forest",pron:"lah fo-reh",gender:"feminine"}];
export const sentences=[
["Once upon a time, there was a little girl with golden hair.","Il était une fois une petite fille aux cheveux d'or."],
["One sunny morning, she walked through the forest.","Un matin ensoleillé, elle se promenait dans la forêt."],
["She found a little house and knocked on the door.","Elle trouva une petite maison et frappa à la porte."],
["Inside, three bowls of porridge waited on the table.","À l'intérieur, trois bols de porridge attendaient sur la table."],
["The first bowl was too hot. The second was too cold.","Le premier bol était trop chaud. Le deuxième était trop froid."],
["The third bowl was just right, so Goldilocks ate it all.","Le troisième bol était parfait, alors Boucle d'Or le mangea entièrement."],
["Then she tried three chairs. The smallest chair broke!","Ensuite, elle essaya trois chaises. La plus petite se cassa !"],
["Feeling tired, she went upstairs and found three beds.","Fatiguée, elle monta à l'étage et trouva trois lits."],
["She fell asleep in the smallest bed.","Elle s'endormit dans le plus petit lit."],
["When the bears came home, they found Goldilocks fast asleep.","Quand les ours rentrèrent, ils trouvèrent Boucle d'Or profondément endormie."],
["Goldilocks woke up, saw the bears and ran all the way home.","Boucle d'Or se réveilla, vit les ours et courut jusqu'à chez elle."]];
export const shelves=[
{id:"goldilocks",title:"Goldilocks and the Three Bears",fr:"Boucle d'Or et les Trois Ours",category:"Little readers",level:"A1",minutes:6,theme:"gold",ready:true,description:"A curious girl discovers a little house in the woods. Three bowls, three chairs and three surprised bears await."},
{id:"pigs",title:"The Three Little Pigs",fr:"Les Trois Petits Cochons",category:"Little readers",level:"A1",minutes:7,theme:"rose",ready:true,description:"Three little pigs build three very different houses. One hungry wolf has other ideas."},
{id:"red",title:"Little Red Riding Hood",fr:"Le Petit Chaperon rouge",category:"Little readers",level:"A1",minutes:8,theme:"berry",ready:true,description:"A walk through the woods, a basket of goodies and a wolf with a plan."},
{id:"clockwork",title:"The Clockwork Detective",fr:"Le Détective mécanique",category:"Teen shelf",level:"A2",minutes:12,theme:"blue",ready:true,description:"A missing invention, a locked workshop and a mystery that ticks louder every hour."},
{id:"train",title:"The Last Train Home",fr:"Le Dernier Train",category:"Grown-up reads",level:"B1",minutes:18,theme:"night",ready:true,description:"A late-night journey brings two strangers face to face with a secret neither expected."},
{id:"velvet",title:"A Velvet Alibi",fr:"Un Alibi de velours",category:"BookTok corner",level:"B2",minutes:20,theme:"velvet",ready:true,description:"Sharp tongues, slow-burn chemistry and one very inconvenient secret."},
{id:"evidence",title:"The Quiet Evidence",fr:"Les Preuves silencieuses",category:"True crime",level:"B2",minutes:22,theme:"slate",ready:true,description:"A carefully sourced case file exploring evidence, investigation and the stories facts can tell."}
];