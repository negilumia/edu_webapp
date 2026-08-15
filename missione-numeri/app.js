// ============================================================
// MISSIONE NUMERI — logica dell'app
// ============================================================

const STORAGE_KEY = "mathquest_progress_v1";

const els = {
  home: document.getElementById("screen-home"),
  briefing: document.getElementById("screen-briefing"),
  game: document.getElementById("screen-game"),
  victory: document.getElementById("screen-victory"),
  worldGrid: document.getElementById("world-grid"),

  briefingEmoji: document.getElementById("briefing-emoji"),
  briefingTitle: document.getElementById("briefing-title"),
  briefingText: document.getElementById("briefing-text"),
  btnStart: document.getElementById("btn-start"),
  btnContinue: document.getElementById("btn-continue"),
  btnBackHome1: document.getElementById("btn-back-home-1"),

  gameStars: document.getElementById("game-stars"),
  btnExit: document.getElementById("btn-exit"),
  trail: document.getElementById("trail"),
  stanzaStory: document.getElementById("stanza-story"),
  problemIndex: document.getElementById("problem-index"),
  promptText: document.getElementById("prompt-text"),
  visualArea: document.getElementById("visual-area"),
  equation: document.getElementById("equation"),
  numericArea: document.getElementById("numeric-area"),
  answerInput: document.getElementById("answer-input"),
  choiceArea: document.getElementById("choice-area"),
  columnArea: document.getElementById("column-area"),
  feedback: document.getElementById("feedback"),
  hintBox: document.getElementById("hint-box"),
  btnCheck: document.getElementById("btn-check"),
  btnHint: document.getElementById("btn-hint"),

  victoryEmoji: document.getElementById("victory-emoji"),
  victoryTitle: document.getElementById("victory-title"),
  victoryText: document.getElementById("victory-text"),
  victoryStars: document.getElementById("victory-stars"),
  btnVictoryHome: document.getElementById("btn-victory-home"),
};

let state = {
  worldId: null,
  stanzaIndex: 0,      // indice della stanza corrente
  ops: [],             // enigmi generati per la stanza corrente
  opIndex: 0,          // a quale enigma della stanza siamo
  stars: 0,
};

// ---------------- persistence ----------------

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveProgress() {
  const all = loadProgress();
  all[state.worldId] = {
    stanzaIndex: state.stanzaIndex,
    stars: state.stars,
    completed: state.stanzaIndex >= WORLDS[state.worldId].stanze.length,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

function getWorldProgress(worldId) {
  const all = loadProgress();
  return all[worldId] || null;
}

// ---------------- helpers numerici ----------------

function tens(n) { return Math.floor(n / 10); }
function units(n) { return n % 10; }
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function shuffle(arr) { return arr.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(v => v[1]); }

// livelli numerici usati da vari generatori (addsub, sequence, wordproblem...)
const LEVEL_CONFIG = {
  easy:    { min: 5,  max: 45, maxSum: 50 },
  medium:  { min: 10, max: 89, maxSum: 99 },
  medium2: { min: 10, max: 89, maxSum: 99 },
  hard:    { min: 12, max: 89, maxSum: 99 },
};

// ---------------- generatore: addizione / sottrazione ----------------

function genAddition({ min, max, maxSum, forceCarry, avoidCarry }) {
  for (let i = 0; i < 200; i++) {
    const a = rand(min, max);
    const b = rand(min, max);
    if (a + b > maxSum) continue;
    const carry = units(a) + units(b) >= 10;
    if (forceCarry && !carry) continue;
    if (avoidCarry && carry) continue;
    return { a, b, op: "+", answer: a + b };
  }
  const a = rand(min, max), b = rand(min, Math.max(min, maxSum - a));
  return { a, b, op: "+", answer: a + b };
}

function genSubtraction({ min, max, avoidBorrow, forceBorrow }) {
  for (let i = 0; i < 200; i++) {
    const a = rand(min, max);
    const b = rand(min, a);
    const borrow = units(a) < units(b);
    if (avoidBorrow && borrow) continue;
    if (forceBorrow && !borrow) continue;
    return { a, b, op: "-", answer: a - b };
  }
  const a = rand(min, max), b = rand(min, a);
  return { a, b, op: "-", answer: a - b };
}

function genAddSubPair(level) {
  const wantAddition = Math.random() < 0.5;
  const c = LEVEL_CONFIG[level] || LEVEL_CONFIG.medium;
  if (level === "easy") {
    return wantAddition ? genAddition({ ...c, avoidCarry: true }) : genSubtraction({ ...c, avoidBorrow: true });
  }
  if (level === "medium") {
    return wantAddition ? genAddition({ ...c }) : genSubtraction({ ...c });
  }
  if (level === "medium2") {
    const force = Math.random() < 0.7;
    return wantAddition ? genAddition({ ...c, forceCarry: force }) : genSubtraction({ ...c, forceBorrow: force });
  }
  // hard
  return wantAddition ? genAddition({ ...c, forceCarry: true }) : genSubtraction({ ...c, forceBorrow: true });
}

// spiega in parole il riporto/prestito, usato nella colonna visiva
function explainColumnOp(a, b, op) {
  const aT = tens(a), aU = units(a), bT = tens(b), bU = units(b);
  if (op === "+") {
    const sumU = aU + bU;
    const carry = sumU >= 10 ? 1 : 0;
    const resU = sumU % 10;
    const resT = aT + bT + carry;
    let text = `Unità: ${aU} + ${bU} = ${sumU}.`;
    if (carry) text += ` Scrivi ${resU} e riporta 1 alle decine.`;
    text += ` Decine: ${aT} + ${bT}${carry ? " + 1 (il riporto)" : ""} = ${resT}.`;
    return { carryDigit: carry, resU, resT, text };
  } else {
    let aUeff = aU, aTeff = aT, borrow = 0, text = "";
    if (aU < bU) {
      aUeff = aU + 10; aTeff = aT - 1; borrow = 1;
      text += `Non puoi togliere ${bU} da ${aU}: prendi in prestito 1 dalle decine, così le unità diventano ${aUeff}. `;
    }
    const resU = aUeff - bU;
    const resT = aTeff - bT;
    text += `Unità: ${aUeff} - ${bU} = ${resU}. Decine: ${aTeff} - ${bT} = ${resT}.`;
    return { borrow, resU, resT, text };
  }
}

function buildColumnHTML(a, b, op) {
  const info = explainColumnOp(a, b, op);
  const aT = tens(a), aU = units(a), bT = tens(b), bU = units(b);
  const carryMark = op === "+" && info.carryDigit ? `<span class="carry-mark">¹</span>` : "";
  const borrowNote = op === "-" && info.borrow ? `<div class="borrow-note">prestito ➜ ${aT}→${aT - 1} decine, ${aU}→${aU + 10} unità</div>` : "";
  return `
    <div class="column-op">
      ${borrowNote}
      <div class="column-grid">
        <div class="col-cell tens-col">${carryMark}${aT}</div><div class="col-cell units-col">${aU}</div>
        <div class="col-cell tens-col op-cell">${op}${bT}</div><div class="col-cell units-col">${bU}</div>
        <div class="col-line"></div>
        <div class="col-cell tens-col result-cell">${info.resT}</div><div class="col-cell units-col result-cell">${info.resU}</div>
      </div>
      <p class="column-explain">${info.text}</p>
    </div>`;
}

// ---------------- generatori: nuove tipologie ----------------

function genCounting(flavor) {
  const total = rand(7, 12);
  const target = rand(2, Math.min(6, total - 2));
  const items = shuffle([
    ...Array(target).fill(flavor.targetEmoji),
    ...Array(total - target).fill(flavor.mainEmoji),
  ]);
  const grid = `<div class="emoji-grid">${items.map(e => `<span>${e}</span>`).join("")}</div>`;
  return {
    kind: "numeric",
    promptText: `Quanti/e ${flavor.label} ci sono in questo insieme di ${flavor.allLabel}?`,
    visualHTML: grid,
    answer: target,
    hint: `Conta solo ${items.filter(i => i === flavor.targetEmoji).length > 0 ? flavor.label : flavor.label}: ignora gli altri simboli e conta soltanto quelli giusti, uno alla volta.`,
  };
}

function genComparison() {
  const equalChance = Math.random() < 0.15;
  let a = rand(5, 95);
  let b = equalChance ? a : rand(5, 95);
  while (!equalChance && a === b) b = rand(5, 95);
  const symbol = a > b ? ">" : a < b ? "<" : "=";
  return {
    kind: "choice",
    promptText: "Quale simbolo va messo tra questi due numeri?",
    equationHTML: `<span>${a}</span><span class="blank">?</span><span>${b}</span>`,
    choices: [
      { label: "> (maggiore)", value: ">" },
      { label: "< (minore)", value: "<" },
      { label: "= (uguale)", value: "=" },
    ],
    answer: symbol,
    hint: `Confronta prima le decine: ${tens(a)} e ${tens(b)}. Se sono uguali, confronta le unità: ${units(a)} e ${units(b)}.`,
  };
}

function genCombinatoria(flavor) {
  const palette = ["rosso", "blu", "verde", "giallo", "viola"];
  const n = rand(3, 4);
  const items = palette.slice(0, n);
  const pairs = (n * (n - 1)) / 2;
  return {
    kind: "numeric",
    promptText: `${flavor.subjectName} ha ${n} colori di ${flavor.itemLabel} (${items.join(", ")}) e vuole creare coppie con 2 colori diversi. Quante coppie diverse può creare?`,
    answer: pairs,
    hint: `Prova a elencarle tutte, senza ripetere: ad esempio ${items[0]}-${items[1]}, ${items[0]}-${items[2]}... Ogni coppia va contata una sola volta.`,
  };
}

const SHAPE_BANK = [
  { name: "triangolo", sides: 3, symbol: "▲" },
  { name: "quadrato", sides: 4, symbol: "■" },
  { name: "rettangolo", sides: 4, symbol: "▬" },
  { name: "pentagono", sides: 5, symbol: "⬠" },
  { name: "cerchio", sides: 0, symbol: "●" },
  { name: "rombo", sides: 4, symbol: "◆" },
];

function genShapes() {
  const shape = SHAPE_BANK[rand(0, SHAPE_BANK.length - 1)];
  const askVertices = Math.random() < 0.5 && shape.sides > 0;
  const question = shape.sides === 0
    ? `Un cerchio: quanti lati dritti ha?`
    : askVertices
      ? `Un ${shape.name}: quanti vertici (angoli) ha?`
      : `Un ${shape.name}: quanti lati ha?`;
  return {
    kind: "numeric",
    promptText: question,
    visualHTML: `<div class="shape-visual">${shape.symbol}</div>`,
    answer: shape.sides,
    hint: shape.sides === 0 ? "Il cerchio è tondo: non ha spigoli né lati dritti." : `Conta i lati uno per uno seguendo il contorno del ${shape.name}: in una figura chiusa, il numero di lati è sempre uguale al numero di vertici.`,
  };
}

function genKeyMatch() {
  const target = SHAPE_BANK[rand(0, SHAPE_BANK.length - 1)];
  const others = shuffle(SHAPE_BANK.filter(s => s.name !== target.name)).slice(0, 3);
  const choices = shuffle([target, ...others]).map(s => ({ label: `${s.symbol}  ${s.name}`, value: s.name }));
  return {
    kind: "choice",
    promptText: `Trova la chiave a forma di ${target.name}!`,
    choices,
    answer: target.name,
    hint: target.sides === 0 ? "Cerca la forma senza angoli, tutta arrotondata." : `Cerca la chiave con ${target.sides} lati.`,
  };
}

function genWordProblem(flavor, level) {
  const c = LEVEL_CONFIG[level] || LEVEL_CONFIG.medium;
  const isAddition = Math.random() < 0.5;
  if (isAddition) {
    const p = genAddition({ ...c, avoidCarry: level === "easy" });
    return {
      kind: "numeric",
      promptText: `${flavor.characterName} ha raccolto ${p.a} ${flavor.itemLabel} la mattina e altri ${p.b} ${flavor.itemLabel} nel pomeriggio. Quanti ${flavor.itemLabel} ha in totale?`,
      answer: p.answer,
      hint: `È un'addizione: metti insieme le due quantità, ${p.a} + ${p.b}.`,
    };
  } else {
    const p = genSubtraction({ ...c, avoidBorrow: level === "easy" });
    return {
      kind: "numeric",
      promptText: `${flavor.characterName} aveva ${p.a} ${flavor.itemLabel}, ma ne ha usati ${p.b} lungo il cammino. Quanti ${flavor.itemLabel} gli restano?`,
      answer: p.answer,
      hint: `È una sottrazione: togli dal totale la parte usata, ${p.a} - ${p.b}.`,
    };
  }
}

function genSequence(level) {
  const steps = level === "hard" ? [3, 4, 6, 7, 9] : level === "easy" ? [2, 5, 10] : [2, 3, 5, 10];
  const step = steps[rand(0, steps.length - 1)];
  const start = rand(0, level === "hard" ? 40 : 15) ;
  const seq = [0, 1, 2, 3, 4].map(i => start + i * step);
  const missingIdx = rand(1, 3);
  const displayed = seq.map((n, i) => (i === missingIdx ? "❓" : n));
  return {
    kind: "numeric",
    promptText: "Completa la sequenza: trova il numero mancante.",
    visualHTML: `<div class="sequence-visual">${displayed.map(v => `<span class="seq-item">${v}</span>`).join("")}</div>`,
    answer: seq[missingIdx],
    hint: `Guarda di quanto aumenta ogni numero rispetto al precedente: qui il passo è sempre +${step}.`,
  };
}

function genCipher(level) {
  const p = genAddSubPair(level);
  const showColumn = level === "hard";
  return {
    kind: "numeric",
    promptText: "🔒 Risolvi il calcolo per scoprire il codice segreto!",
    equationHTML: `<span>${p.a}</span><span>${p.op}</span><span>${p.b}</span><span>=</span>`,
    columnHTML: showColumn ? buildColumnHTML(p.a, p.b, p.op) : null,
    answer: p.answer,
    hint: p.op === "+"
      ? `Dividi in decine e unità: ${p.a} = ${tens(p.a) * 10} + ${units(p.a)}, ${p.b} = ${tens(p.b) * 10} + ${units(p.b)}. Somma prima le decine, poi le unità.`
      : `Dividi in decine e unità: ${p.a} = ${tens(p.a) * 10} + ${units(p.a)}, ${p.b} = ${tens(p.b) * 10} + ${units(p.b)}. Sottrai prima le unità, poi le decine.`,
  };
}

function genAddSub(level) {
  const p = genAddSubPair(level);
  const showColumn = level === "hard";
  return {
    kind: "numeric",
    promptText: null,
    equationHTML: `<span>${p.a}</span><span>${p.op}</span><span>${p.b}</span><span>=</span>`,
    columnHTML: showColumn ? buildColumnHTML(p.a, p.b, p.op) : null,
    answer: p.answer,
    hint: p.op === "+"
      ? `Dividi in decine e unità: ${p.a} = ${tens(p.a) * 10} + ${units(p.a)}, ${p.b} = ${tens(p.b) * 10} + ${units(p.b)}. Somma prima le decine, poi le unità.`
      : `Dividi in decine e unità: ${p.a} = ${tens(p.a) * 10} + ${units(p.a)}, ${p.b} = ${tens(p.b) * 10} + ${units(p.b)}. Sottrai prima le unità, poi le decine.`,
  };
}

// ---------------- dispatcher ----------------

function generateProblem(problemDef, level) {
  const flavor = problemDef.flavor || {};
  switch (problemDef.type) {
    case "counting": return genCounting(flavor);
    case "comparison": return genComparison();
    case "combinatoria": return genCombinatoria(flavor);
    case "shapes": return genShapes();
    case "keymatch": return genKeyMatch();
    case "wordproblem": return genWordProblem(flavor, level);
    case "sequence": return genSequence(level);
    case "cipher": return genCipher(level);
    case "addsub":
    default: return genAddSub(level);
  }
}

// ---------------- screens ----------------

function showScreen(name) {
  [els.home, els.briefing, els.game, els.victory].forEach(s => s.classList.add("hidden"));
  els[name].classList.remove("hidden");
}

function renderHome() {
  els.worldGrid.innerHTML = "";
  Object.values(WORLDS).forEach(world => {
    const prog = getWorldProgress(world.id);
    const card = document.createElement("button");
    card.className = "world-card";
    card.setAttribute("data-c", world.theme);
    card.style.position = "relative";
    card.innerHTML = `
      ${prog ? `<span class="progress-pill">${prog.completed ? "Completato ✔" : `${prog.stanzaIndex}/${world.stanze.length}`}</span>` : ""}
      <span class="emoji">${world.emoji}</span>
      <h3>${world.name}</h3>
      <p>${world.tagline}</p>
      <div class="meta">
        <span class="badge stanze">${world.stanze.length} stanze</span>
        <span class="badge diff-${world.difficulty}">${world.difficulty}</span>
      </div>
    `;
    card.addEventListener("click", () => openBriefing(world.id));
    els.worldGrid.appendChild(card);
  });
  showScreen("home");
}

function openBriefing(worldId) {
  const world = WORLDS[worldId];
  document.body.setAttribute("data-theme", world.theme);
  els.briefingEmoji.textContent = world.emoji;
  els.briefingTitle.textContent = world.name;
  els.briefingText.textContent = world.briefing;

  const prog = getWorldProgress(worldId);
  const hasProgress = prog && !prog.completed && prog.stanzaIndex > 0;
  els.btnContinue.classList.toggle("hidden", !hasProgress);
  els.btnStart.textContent = prog && prog.stanzaIndex > 0 ? "Ricomincia da capo" : "Comincia l'avventura";

  els.btnStart.onclick = () => startWorld(worldId, true);
  els.btnContinue.onclick = () => startWorld(worldId, false);

  showScreen("briefing");
}

function startWorld(worldId, fresh) {
  const prog = getWorldProgress(worldId);
  state.worldId = worldId;
  if (fresh || !prog) {
    state.stanzaIndex = 0;
    state.stars = 0;
  } else {
    state.stanzaIndex = prog.stanzaIndex;
    state.stars = prog.stars;
  }
  saveProgress();
  loadStanza();
}

function loadStanza() {
  const world = WORLDS[state.worldId];
  const stanza = world.stanze[state.stanzaIndex];
  state.ops = stanza.problems.map(def => generateProblem(def, world.level));
  state.opIndex = 0;
  renderGame();
}

function renderTrail() {
  const world = WORLDS[state.worldId];
  els.trail.innerHTML = "";
  world.stanze.forEach((_, i) => {
    if (i > 0) {
      const line = document.createElement("div");
      line.className = "trail-line " + (i <= state.stanzaIndex ? "done" : "todo");
      els.trail.appendChild(line);
    }
    const dot = document.createElement("div");
    let cls = "todo";
    let label = i + 1;
    if (i < state.stanzaIndex) { cls = "done"; label = "✔"; }
    else if (i === state.stanzaIndex) { cls = "current"; }
    dot.className = "trail-step " + cls;
    dot.textContent = label;
    els.trail.appendChild(dot);
  });
}

function renderGame() {
  const world = WORLDS[state.worldId];
  const stanza = world.stanze[state.stanzaIndex];
  const problem = state.ops[state.opIndex];

  els.gameStars.textContent = "⭐ " + state.stars;
  renderTrail();
  els.stanzaStory.textContent = stanza.text;

  els.problemIndex.textContent = state.ops.length > 1
    ? `Enigma ${state.opIndex + 1} di ${state.ops.length}`
    : `Stanza ${state.stanzaIndex + 1} di ${world.stanze.length}`;

  els.promptText.textContent = problem.promptText || "";
  els.promptText.classList.toggle("hidden", !problem.promptText);

  els.visualArea.innerHTML = problem.visualHTML || "";
  els.visualArea.classList.toggle("hidden", !problem.visualHTML);

  els.equation.innerHTML = problem.equationHTML || "";
  els.equation.classList.toggle("hidden", !problem.equationHTML);

  els.columnArea.innerHTML = problem.columnHTML || "";
  els.columnArea.classList.toggle("hidden", !problem.columnHTML);

  // area di risposta: numerica oppure a scelta multipla
  if (problem.kind === "choice") {
    els.numericArea.classList.add("hidden");
    els.choiceArea.classList.remove("hidden");
    els.choiceArea.innerHTML = "";
    problem.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = choice.label;
      btn.addEventListener("click", () => checkAnswer(choice.value, btn));
      els.choiceArea.appendChild(btn);
    });
    els.btnCheck.classList.add("hidden");
  } else {
    els.choiceArea.classList.add("hidden");
    els.numericArea.classList.remove("hidden");
    els.answerInput.value = "";
    els.btnCheck.classList.remove("hidden");
  }

  els.feedback.textContent = "";
  els.feedback.className = "feedback";
  els.hintBox.classList.remove("show");
  els.hintBox.textContent = "";

  showScreen("game");
  if (problem.kind !== "choice") {
    setTimeout(() => els.answerInput.focus(), 50);
  }
}

function checkAnswer(choiceValue, choiceBtnEl) {
  const problem = state.ops[state.opIndex];
  let val;
  if (problem.kind === "choice") {
    val = choiceValue;
  } else {
    const raw = els.answerInput.value.trim();
    if (raw === "") return;
    val = parseInt(raw, 10);
  }

  const correct = val === problem.answer;

  if (correct) {
    state.stars += 1;
    els.feedback.textContent = pickPraise();
    els.feedback.className = "feedback ok";
    if (problem.kind === "choice") {
      Array.from(els.choiceArea.children).forEach(b => b.disabled = true);
      if (choiceBtnEl) choiceBtnEl.classList.add("choice-correct");
    } else {
      els.btnCheck.disabled = true;
    }
    setTimeout(() => {
      els.btnCheck.disabled = false;
      advance();
    }, 800);
  } else {
    els.feedback.textContent = "Quasi! Riprova 💪";
    els.feedback.className = "feedback no";
    if (problem.kind === "choice") {
      if (choiceBtnEl) {
        choiceBtnEl.classList.add("choice-wrong");
        setTimeout(() => choiceBtnEl.classList.remove("choice-wrong"), 500);
      }
    } else {
      els.answerInput.select();
    }
  }
}

function pickPraise() {
  const options = ["Esatto! 🎉", "Bravissimo! ⭐", "Perfetto! 🌟", "Ottimo lavoro! 🚀", "Sei un campione! 🏆"];
  return options[rand(0, options.length - 1)];
}

function showHint() {
  const problem = state.ops[state.opIndex];
  els.hintBox.textContent = "💡 " + (problem.hint || "Ragiona con calma, un pezzo alla volta!");
  els.hintBox.classList.add("show");
}

function advance() {
  const world = WORLDS[state.worldId];
  state.opIndex += 1;
  if (state.opIndex < state.ops.length) {
    renderGame();
    return;
  }
  state.stanzaIndex += 1;
  saveProgress();
  if (state.stanzaIndex >= world.stanze.length) {
    showVictory();
  } else {
    loadStanza();
  }
}

function showVictory() {
  const world = WORLDS[state.worldId];
  els.victoryEmoji.textContent = world.emoji;
  els.victoryTitle.textContent = "Missione completata!";
  els.victoryText.textContent = world.victoryText;
  els.victoryStars.textContent = "⭐ " + state.stars + " stelle raccolte";
  showScreen("victory");
}

// ---------------- events ----------------

els.btnBackHome1.addEventListener("click", renderHome);
els.btnExit.addEventListener("click", () => {
  saveProgress();
  renderHome();
});
els.btnVictoryHome.addEventListener("click", renderHome);
els.btnCheck.addEventListener("click", () => checkAnswer());
els.btnHint.addEventListener("click", showHint);
els.answerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkAnswer();
});

renderHome();
