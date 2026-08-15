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
  // IL REGNO DELLE MACCHINE — 15 stanze, facile
  // Leo, giovane apprendista inventore, deve attraversare le sale
  // di ingranaggi e vapore del regno per riparare il Grande
  // Orologio prima che il tempo si fermi per sempre.
  // ----------------------------------------------------------
  castello: {
    id: "castello",
    theme: "castello",
    emoji: "⚙️",
    name: "Il Regno delle Macchine",
    tagline: "Un'avventura tra ingranaggi, vapore e invenzioni.",
    difficulty: "facile",
    level: "easy",
    briefing: "Il Grande Orologio che scandisce il tempo per tutto il Regno delle Macchine si è fermato! Leo, giovane apprendista inventore, deve attraversare sale di ingranaggi e vapore per ripararlo pezzo dopo pezzo, risolvendo un enigma alla volta. Aiuterai Leo a rimettere in moto il regno?",
    victoryText: "Il Grande Orologio riparte con un rombo potente! Gli ingranaggi tornano a girare e tutto il Regno delle Macchine festeggia con fischi di vapore e campane di ottone.",
    stanze: [
      { text: "Leo entra nella Sala delle Caldaie, dove il vapore sibila tra i tubi di rame.", problems: [{ type: "addsub" }] },
      { text: "Sul pavimento sono sparsi tanti ingranaggi: alcuni sono dorati e più preziosi degli altri.", problems: [{ type: "counting", flavor: { mainEmoji: "⚙️", targetEmoji: "🟡", label: "ingranaggi dorati", allLabel: "ingranaggi" } }] },
      { text: "Due leve di ottone spuntano dal muro: una più lunga, una più corta. Solo quella giusta aziona il montacarichi.", problems: [{ type: "comparison" }] },
      { text: "Un nastro trasportatore mostra casse numerate in fila, ma una cassa è andata perduta lungo il percorso.", problems: [{ type: "sequence" }] },
      { text: "Un ingranaggio enorme blocca il passaggio: per smontarlo bisogna riconoscerne la forma.", problems: [{ type: "shapes" }] },
      { text: "Leo ripara una valvola che borbotta numeri insieme a sbuffi di vapore.", problems: [{ type: "addsub" }] },
      { text: "Un vecchio orologiaio robot propone un indovinello sulle rotelle colorate del suo laboratorio.", problems: [{ type: "combinatoria", flavor: { itemLabel: "rotelle colorate", subjectName: "Un vecchio orologiaio robot" } }] },
      { text: "Nel Deposito Bulloni, Leo conta i pezzi necessari per costruire il prossimo ingranaggio.", problems: [{ type: "wordproblem", flavor: { itemLabel: "bulloni", characterName: "Leo" } }] },
      { text: "Tre serrature meccaniche proteggono la Sala dei Pistoni: solo una chiave ha la forma giusta.", problems: [{ type: "keymatch" }] },
      { text: "In una cesta di componenti, Leo nota alcune viti blu tra tutte le altre.", problems: [{ type: "counting", flavor: { mainEmoji: "🔩", targetEmoji: "🔵", label: "viti blu", allLabel: "viti" } }] },
      { text: "Due tubi del vapore attraversano il soffitto: uno più lungo dell'altro.", problems: [{ type: "comparison" }] },
      { text: "Il pannello di controllo del Grande Orologio si sblocca solo con un codice segreto.", problems: [{ type: "cipher" }] },
      { text: "Gli ultimi ingranaggi della torre sono numerati, ma uno è scomparso, arrugginito.", problems: [{ type: "sequence" }] },
      { text: "Leo è quasi arrivato al cuore del meccanismo: un ultimo blocco lo separa dalla stanza finale.", problems: [{ type: "addsub" }] },
      { text: "Il Grande Orologio è fermo da troppo tempo: una doppia sfida finale lo rimetterà in moto per sempre!", problems: [{ type: "addsub" }, { type: "comparison" }] },
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
