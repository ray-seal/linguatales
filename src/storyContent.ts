import { sentences } from "./data";
export type StoryLine = [string, string];
export const storyContent: Record<string, StoryLine[]> = {
  goldilocks: sentences.map(([en, fr]) => [fr, en]),
  pigs: [
    ["Trois petits cochons construisirent trois maisons.", "Three little pigs built three houses."],
    ["Un loup souffla sur la maison de paille.", "A wolf blew at the straw house."],
    ["La maison en bois tomba aussi.", "The wooden house fell too."],
    ["La maison en briques resta debout.", "The brick house stayed standing."],
    ["Les trois cochons étaient enfin en sécurité.", "The three pigs were finally safe."]
  ],
  red: [
    ["Le Petit Chaperon rouge traversait la forêt avec un panier.", "Little Red Riding Hood walked through the forest with a basket."],
    ["Un loup lui demanda où elle allait.", "A wolf asked where she was going."],
    ["Elle allait rendre visite à sa grand-mère.", "She was going to visit her grandmother."],
    ["Le loup prit un raccourci.", "The wolf took a shortcut."],
    ["Un garde forestier arriva juste à temps.", "A forest ranger arrived just in time."]
  ],
  lantern: [
    ["Lila trouva une vieille lanterne près du puits.", "Lila found an old lantern beside the well."],
    ["Chaque soir, elle marchait jusqu'à la colline.", "Every evening, she walked to the hill."],
    ["Un renard était coincé sous une branche.", "A fox was trapped beneath a branch."],
    ["Lila souleva le bois et libéra le renard.", "Lila lifted the wood and freed the fox."],
    ["Elle retrouva le chemin grâce aux étoiles.", "She found her way home by the stars."]
  ],
  clockwork: [
    ["À minuit, toutes les horloges s'arrêtèrent.", "At midnight, every clock stopped."],
    ["Mara reçut une lettre sans signature.", "Mara received a letter with no signature."],
    ["Elle trouva une clé sous une vieille lampe.", "She found a key beneath an old lamp."],
    ["Un automate tenait une montre cassée.", "A mechanical figure held a broken watch."],
    ["Mara répara la montre et le temps reprit son cours.", "Mara repaired the watch and time started again."]
  ],
  train: [
    ["Le dernier train quitta la gare sous la pluie.", "The last train left the station in the rain."],
    ["Élise trouva une place près de la fenêtre.", "Élise found a seat by the window."],
    ["Un homme lui tendit une enveloppe bleue.", "A man handed her a blue envelope."],
    ["Son nom était écrit dessus.", "Her name was written on it."],
    ["À l'intérieur, elle trouva une vieille photo de sa mère.", "Inside, she found an old photograph of her mother."]
  ],
  velvet: [
    ["Adrian arriva en retard au dîner.", "Adrian arrived late for dinner."],
    ["Clara posa une enveloppe sur la table.", "Clara placed an envelope on the table."],
    ["À l'intérieur se trouvait la preuve qu'ils cherchaient.", "Inside was the proof they had been looking for."],
    ["Adrian cessa de sourire.", "Adrian stopped smiling."],
    ["Où as-tu trouvé ça ? demanda-t-il.", "Where did you find this? he asked."]
  ],
  evidence: [
    ["La police arriva dans une maison calme.", "Police arrived at a quiet house."],
    ["Un verre était posé près de la fenêtre.", "A glass stood beside the window."],
    ["Les enquêteurs photographièrent la pièce.", "Investigators photographed the room."],
    ["Une empreinte partielle fut trouvée sur le verre.", "A partial fingerprint was found on the glass."],
    ["Une hypothèse n'est pas une preuve.", "A theory is not proof."]
  ],
  biker: [
    ["La pluie commença avant la fermeture du café.", "The rain began before the café closed."],
    ["Nora vit la moto de son mari devant la porte.", "Nora saw her husband's motorbike outside."],
    ["Il avait promis de rentrer avant la nuit.", "He had promised to be home before dark."],
    ["Sa moto était en panne, mais il allait bien.", "His bike had broken down, but he was okay."],
    ["Ils rentrèrent ensemble sous la pluie.", "They rode home together in the rain."]
  ],
  boy: [
    ["Tom aimait lire des histoires.", "Tom loved reading stories."],
    ["Les autres garçons riaient de lui.", "The other boys laughed at him."],
    ["Un jour, Tom écrivit sa propre histoire.", "One day, Tom wrote his own story."],
    ["Son héros choisissait sa propre route.", "His hero chose his own path."],
    ["Tom apprit que le courage avait plusieurs formes.", "Tom learned that courage came in many forms."]
  ]
};
