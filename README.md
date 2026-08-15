# 🚀 Le mie Web App

Raccolta di piccole web-app didattiche, pensate per bambini della scuola primaria, pubblicate tramite GitHub Pages.

**Sito live:** `https://tuonomeutente.github.io/nome-repository/`

## 📂 Struttura del repository

Ogni app vive nella propria sottocartella, completamente autonoma (HTML + CSS + JS, nessuna dipendenza esterna a parte i Google Fonts). Il file `index.html` nella radice mostra l'elenco di tutte le app disponibili.

```
/
├── index.html              → homepage con l'elenco delle app
└── missione-numeri/
    ├── index.html           → struttura e stili dell'app
    ├── app.js               → logica di gioco e generazione degli enigmi
    └── story-data.js        → testi delle storie e configurazione dei mondi
```

## 🍄 Missione Numeri

Gioco-avventura in stile escape room per bambini di 7-8 anni. Il bambino sceglie tra 4 mondi narrativi (dal più facile al più difficile) e avanza risolvendo enigmi matematici: addizioni e sottrazioni entro il 100, conteggio e insiemistica, confronti, combinatoria, forme geometriche, sequenze numeriche e problemi con testo.

I progressi si salvano automaticamente nel browser (`localStorage`), quindi si può riprendere da dove si era arrivati.

## ➕ Aggiungere una nuova app

1. Crea una nuova sottocartella nella radice del repository (es. `nome-nuova-app/`) con dentro tutti i file dell'app.
2. Apri `index.html` nella radice e aggiungi un nuovo blocco `<a class="app-card">...</a>` nella sezione `app-list`, seguendo l'esempio già commentato nel file.
3. Fai commit: GitHub Pages aggiornerà il sito automaticamente in pochi minuti.

## 🛠️ Tecnologie

Solo HTML, CSS e JavaScript "vanilla", senza framework né build step. Font da Google Fonts (Baloo 2, Nunito). Hosting gratuito su GitHub Pages.

## 📄 Licenza e utilizzo

Repository personale a scopo didattico. Il codice non è concesso per riutilizzo o distribuzione senza autorizzazione.
