// ============================================================
// MISSIONE NUMERI — dati delle avventure
// Ogni mondo ha: id, emoji, nome, difficoltà (usata per generare
// i calcoli), livello e le stanze.
// Ogni stanza ha "text" (narrazione) e "problems": un array di
// 1 (normale) o 2 (stanza "boss") enigmi. Ogni enigma ha un
// "type" tra: addsub, counting, comparison, combinatoria,
// shapes, wordproblem, cipher, keymatch, sequence.
// "flavor" personalizza il testo/tema dell'enigma per il mondo.
// ============================================================

const WORLDS = {

  // ----------------------------------------------------------
  // IL REGNO DEI FUNGHI — 15 stanze, facile
  // Leo, un giovane idraulico coraggioso, deve attraversare il
  // Regno dei Funghi per salvare la Principessa Stella dalle
  // grinfie del terribile Re Corazza.
  // ----------------------------------------------------------
  castello: {
    id: "castello",
    theme: "castello",
    emoji: "🍄",
    name: "Il Regno dei Funghi",
    tagline: "Un'avventura a tappe piena di monete e sorprese.",
    difficulty: "facile",
    level: "easy",
    briefing: "Il perfido Re Corazza ha rapito la Principessa Stella e l'ha rinchiusa nel suo castello! Leo, il giovane idraulico coraggioso, parte all'avventura attraverso il Regno dei Funghi. Ogni ostacolo si supera solo risolvendo un enigma. Aiuterai Leo a salvare la principessa?",
    victoryText: "Leo sconfigge Re Corazza e libera la Principessa Stella! Tutto il Regno dei Funghi festeggia con fuochi d'artificio.",
    stanze: [
      { text: "Leo entra nel primo tubo verde e cade in un prato pieno di monete dorate.", problems: [{ type: "addsub" }] },
      { text: "Tra l'erba alta, Leo nota tante monete: alcune sono dorate, altre argentate.", problems: [{ type: "counting", flavor: { mainEmoji: "🪙", targetEmoji: "⚪", label: "monete argentate", allLabel: "monete" } }] },
      { text: "Due tubi conducono avanti: uno più alto, uno più basso. Leo deve scegliere quello giusto.", problems: [{ type: "comparison" }] },
      { text: "Una fila di blocchi numerati galleggia a mezz'aria: manca un blocco per completare il ponte.", problems: [{ type: "sequence" }] },
      { text: "Un blocco a punto interrogativo trema: per aprirlo bisogna conoscere la sua forma.", problems: [{ type: "shapes" }] },
      { text: "Leo attraversa una grotta di funghi luminosi che ronzano di numeri.", problems: [{ type: "addsub" }] },
      { text: "Alcuni gnomi mercanti vendono bandierine colorate e propongono un indovinello.", problems: [{ type: "combinatoria", flavor: { itemLabel: "bandierine", subjectName: "Uno gnomo mercante" } }] },
      { text: "Nel Bosco dei Funghi Rossi, Leo raccoglie provviste per il viaggio.", problems: [{ type: "wordproblem", flavor: { itemLabel: "funghi rossi", characterName: "Leo" } }] },
      { text: "Davanti a una porta di legno ci sono tre serrature di forme diverse: solo una chiave è quella giusta.", problems: [{ type: "keymatch" }] },
      { text: "In una grotta scintillante, Leo trova un insieme di gemme di vari colori.", problems: [{ type: "counting", flavor: { mainEmoji: "💎", targetEmoji: "🔷", label: "gemme blu", allLabel: "gemme" } }] },
      { text: "Due ponti sospesi portano al castello: uno più lungo, uno più corto.", problems: [{ type: "comparison" }] },
      { text: "La cassaforte del castello ha una combinazione segreta nascosta in un calcolo.", problems: [{ type: "cipher" }] },
      { text: "Gli ultimi gradini della torre sono numerati, ma uno manca all'appello.", problems: [{ type: "sequence" }] },
      { text: "Leo è quasi arrivato: un ultimo fossato lo separa dal ponte levatoio.", problems: [{ type: "addsub" }] },
      { text: "Re Corazza appare sulla torre più alta! Solo una doppia sfida può liberare la Principessa Stella.", problems: [{ type: "addsub" }, { type: "comparison" }] },
    ],
  },

  // ----------------------------------------------------------
  // L'ISOLA DEI SETTE FORZIERI — 10 stanze, media
  // ----------------------------------------------------------
  pirati: {
    id: "pirati",
    theme: "pirati",
    emoji: "🏴‍☠️",
    name: "L'Isola dei Sette Forzieri",
    tagline: "Un viaggio di mare pieno di indovinelli.",
    difficulty: "media",
    level: "medium",
    briefing: "Una vecchia mappa scolorita ti ha portato fino a qui: l'Isola dei Sette Forzieri. Ogni forziere è protetto da un enigma. Sei pronto a salpare?",
    victoryText: "Hai trovato tutti e sette i forzieri! L'equipaggio ti nomina Capitano dei Numeri.",
    stanze: [
      { text: "Sbarchi sull'isola con la mappa in mano. Il primo segno X appare solo risolvendo questo calcolo.", problems: [{ type: "addsub" }] },
      { text: "Sulla spiaggia trovi un insieme di conchiglie: alcune sono rosa scintillante.", problems: [{ type: "counting", flavor: { mainEmoji: "🐚", targetEmoji: "🌸", label: "conchiglie rosa", allLabel: "conchiglie" } }] },
      { text: "Due sentieri nella giungla portano al campo pirata: uno segnato con un numero più alto dell'altro.", problems: [{ type: "comparison" }] },
      { text: "Sotto la palma più storta dell'isola trovi un forziere con tre serrature di forme diverse.", problems: [{ type: "keymatch" }] },
      { text: "Il cuoco di bordo ti chiede aiuto per contare le provviste rimaste.", problems: [{ type: "wordproblem", flavor: { itemLabel: "banane", characterName: "Il cuoco della nave" } }] },
      { text: "Una serie di orme sulla sabbia conduce al tesoro, ma un'impronta numerata manca.", problems: [{ type: "sequence" }] },
      { text: "Il vecchio forziere di legno si apre solo con un codice segreto.", problems: [{ type: "cipher" }] },
      { text: "Un pappagallo saccente propone un indovinello sulle bandiere delle navi pirata.", problems: [{ type: "combinatoria", flavor: { itemLabel: "bandiere", subjectName: "Il pappagallo Coco" } }] },
      { text: "Il ponte di corde scricchiola paurosamente: solo il calcolo giusto lo rende sicuro.", problems: [{ type: "addsub" }] },
      { text: "Sei arrivato alla Baia dei Sette Forzieri! Risolvi la doppia sfida del capitano per reclamare il tesoro leggendario.", problems: [{ type: "addsub" }, { type: "counting", flavor: { mainEmoji: "🟡", targetEmoji: "🔴", label: "monete rosse", allLabel: "monete del tesoro" } }] },
    ],
  },

  // ----------------------------------------------------------
  // MISSIONE STELLARE ORIONE — 8 stanze, medio-difficile
  // ----------------------------------------------------------
  spazio: {
    id: "spazio",
    theme: "spazio",
    emoji: "🚀",
    name: "Missione Stellare Orione",
    tagline: "Vola tra i pianeti risolvendo enigmi spaziali.",
    difficulty: "media",
    level: "medium2",
    briefing: "Il centro di controllo ha perso il contatto con la stazione spaziale Orione-9. Sali a bordo del tuo razzo: solo risolvendo gli enigmi di rotta potrai raggiungerla!",
    victoryText: "Hai raggiunto la stazione Orione-9 e salvato l'equipaggio! La Terra festeggia il tuo nome tra le stelle.",
    stanze: [
      { text: "Decolli dalla base spaziale. Il computer di bordo chiede il codice di lancio.", problems: [{ type: "addsub" }] },
      { text: "Sullo schermo appare una sequenza di pianeti numerati, ma uno manca dalla fila.", problems: [{ type: "sequence" }] },
      { text: "Attraversi un campo di asteroidi: alcuni brillano di un colore diverso dagli altri.", problems: [{ type: "counting", flavor: { mainEmoji: "🪨", targetEmoji: "✨", label: "asteroidi luminosi", allLabel: "asteroidi" } }] },
      { text: "Due pianeti appaiono all'orizzonte: uno è più vicino dell'altro alla tua rotta.", problems: [{ type: "comparison" }] },
      { text: "Il portellone del laboratorio alieno si apre solo con un codice segreto.", problems: [{ type: "cipher" }] },
      { text: "Un piccolo robot ti chiede aiuto per calcolare il carburante rimasto per il viaggio.", problems: [{ type: "wordproblem", flavor: { itemLabel: "litri di carburante", characterName: "Il robot di bordo" } }] },
      { text: "Superi la Nube Viola, dove ogni cosa fluttua, numeri compresi.", problems: [{ type: "addsub" }] },
      { text: "Sei arrivato a Orione-9! Il portellone finale si apre solo con la doppia combinazione.", problems: [{ type: "addsub" }, { type: "sequence" }] },
    ],
  },

  // ----------------------------------------------------------
  // IL GRANDE SCAVO DEI DINOSAURI — 5 stanze, difficile
  // ----------------------------------------------------------
  dino: {
    id: "dino",
    theme: "dino",
    emoji: "🦴",
    name: "Il Grande Scavo dei Dinosauri",
    tagline: "La sfida più intensa, per veri esploratori esperti.",
    difficulty: "difficile",
    level: "hard",
    briefing: "Sei il paleontologo più giovane della spedizione! Un intero scheletro di dinosauro è sepolto sotto il campo di scavo: ogni osso ritrovato richiede un calcolo preciso, con numeri più grandi e qualche riporto in più. Pronto per la sfida più intensa?",
    victoryText: "Hai riportato alla luce lo scheletro completo del dinosauro! Il museo lo chiamerà con il tuo nome per sempre.",
    stanze: [
      { text: "Arrivi al campo base della spedizione. Il capo archeologo ti affida la tua prima area di scavo.", problems: [{ type: "addsub" }] },
      { text: "Scavando, trovi un insieme di frammenti d'osso: alcuni sono chiaramente fossilizzati.", problems: [{ type: "counting", flavor: { mainEmoji: "🪨", targetEmoji: "🦴", label: "frammenti fossilizzati", allLabel: "frammenti" } }] },
      { text: "La sabbia si sposta e appare un artiglio enorme: per liberarlo serve un calcolo preciso.", problems: [{ type: "addsub" }] },
      { text: "Due zampe fossili emergono dalla roccia: una impronta è più grande dell'altra.", problems: [{ type: "comparison" }] },
      { text: "È il momento di ricomporre lo scheletro completo: risolvi la doppia sfida finale!", problems: [{ type: "addsub" }, { type: "addsub" }] },
    ],
  },

};
