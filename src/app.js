const stages = {
  setup: document.querySelector("#setupStage"),
  spell: document.querySelector("#spellStage"),
  play: document.querySelector("#playStage"),
  extra: document.querySelector("#extraStage"),
  end: document.querySelector("#endStage")
};

const appShell = document.querySelector("#appShell");
const wordForm = document.querySelector("#wordForm");
const secretWordInput = document.querySelector("#secretWord");
const setupHint = document.querySelector("#setupHint");
const toggleWordButton = document.querySelector("#toggleWordButton");
const skipSpellButton = document.querySelector("#skipSpellButton");
const spellCheckButton = document.querySelector("#spellCheckButton");
const spellResult = document.querySelector("#spellResult");
const acceptSuggestionButton = document.querySelector("#acceptSuggestionButton");
const startGameButton = document.querySelector("#startGameButton");
const guessForm = document.querySelector("#guessForm");
const letterInput = document.querySelector("#letterInput");
const wordDisplay = document.querySelector("#wordDisplay");
const guessedLetters = document.querySelector("#guessedLetters");
const statusText = document.querySelector("#statusText");
const mistakeCount = document.querySelector("#mistakeCount");
const sparkleLayer = document.querySelector("#sparkleLayer");
const playAgainButton = document.querySelector("#playAgainButton");
const restartButton = document.querySelector("#restartButton");
const endTitle = document.querySelector("#endTitle");
const endMessage = document.querySelector("#endMessage");
const winCelebration = document.querySelector("#winCelebration");
const extraYesButton = document.querySelector("#extraYesButton");
const extraNoButton = document.querySelector("#extraNoButton");
const bodyParts = [...document.querySelectorAll(".body-part")];
const hangmanCard = document.querySelector(".hangman-card");

const defaultWrongGuessLimit = 6;
const extraWrongGuesses = 3;
const maxWrongGuesses = defaultWrongGuessLimit + extraWrongGuesses;
let secretWord = "";
let revealedLetters = new Set();
let guessed = new Map();
let wrongGuesses = 0;
let extraGuessesActive = false;
let spellingSuggestion = "";

function showStage(stageName) {
  Object.values(stages).forEach((stage) => stage.classList.remove("active"));
  stages[stageName].classList.add("active");
  appShell.classList.remove("host-mode", "guesser-mode", "end-mode");
  appShell.classList.add(stageName === "setup" || stageName === "spell" ? "host-mode" : stageName === "end" ? "end-mode" : "guesser-mode");
}

function cleanWord(value) {
  return value.trim().toLowerCase().replace(/[^a-z]/g, "");
}

function setSecretWordVisible(isVisible) {
  secretWordInput.type = isVisible ? "text" : "password";
  toggleWordButton.classList.toggle("is-visible", isVisible);
  toggleWordButton.setAttribute("aria-label", isVisible ? "Hide secret word" : "Show secret word");
  toggleWordButton.setAttribute("title", isVisible ? "Hide secret word" : "Show secret word");
}

function resetSpellingCheck() {
  spellingSuggestion = "";
  spellResult.textContent = "";
  acceptSuggestionButton.classList.add("hidden");
  startGameButton.classList.add("hidden");
}

function resetGame() {
  secretWord = "";
  revealedLetters = new Set();
  guessed = new Map();
  wrongGuesses = 0;
  extraGuessesActive = false;
  spellingSuggestion = "";
  secretWordInput.value = "";
  setSecretWordVisible(true);
  setupHint.textContent = "Letters only, at least 5 letters long. Tap the closed eye to hide the word while typing.";
  resetSpellingCheck();
  letterInput.disabled = false;
  bodyParts.forEach((part) => part.classList.remove("visible"));
  hangmanCard.classList.remove("shake", "glow", "cheer");
  renderGame();
  showStage("setup");
  secretWordInput.focus();
}

function renderGame() {
  wordDisplay.innerHTML = "";
  wordDisplay.style.setProperty("--letter-count", Math.max(secretWord.length, 1));
  [...secretWord].forEach((letter) => {
    const slot = document.createElement("span");
    slot.className = "letter-slot";
    slot.textContent = revealedLetters.has(letter) ? letter : "";
    wordDisplay.append(slot);
  });

  guessedLetters.innerHTML = "";
  [...guessed.entries()].forEach(([letter, isRight]) => {
    const chip = document.createElement("span");
    chip.className = `guess-chip ${isRight ? "right" : "wrong"}`;
    chip.textContent = letter;
    guessedLetters.append(chip);
  });

  bodyParts.forEach((part, index) => {
    part.classList.toggle("visible", index < wrongGuesses);
  });

  const guessText = wrongGuesses === 1 ? "1 wrong guess" : `${wrongGuesses} wrong guesses`;
  const currentLimit = extraGuessesActive ? maxWrongGuesses : defaultWrongGuessLimit;
  mistakeCount.textContent = `${guessText} of ${currentLimit}`;
}

function startGame() {
  revealedLetters = new Set();
  guessed = new Map();
  wrongGuesses = 0;
  extraGuessesActive = false;
  statusText.textContent = "Guess a letter.";
  renderGame();
  showStage("play");
  letterInput.focus();
}

async function fetchSpellingSuggestion(word) {
  const response = await fetch(`https://api.datamuse.com/words?sp=${encodeURIComponent(word)}&max=1`);
  if (!response.ok) {
    return "";
  }

  const matches = await response.json();
  const bestMatch = matches[0]?.word ? cleanWord(matches[0].word) : "";
  return bestMatch && bestMatch !== word ? bestMatch : "";
}

async function checkSpelling() {
  spellResult.textContent = "Checking...";
  spellCheckButton.disabled = true;
  acceptSuggestionButton.classList.add("hidden");
  spellingSuggestion = "";

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${secretWord}`);
    if (response.ok) {
      spellResult.textContent = `"${secretWord}" looks like a real word. Nice one.`;
    } else {
      spellingSuggestion = await fetchSpellingSuggestion(secretWord);
      if (spellingSuggestion) {
        spellResult.textContent = `"${secretWord}" was not found as a real word. Do you mean "${spellingSuggestion}"?`;
        acceptSuggestionButton.textContent = `Use "${spellingSuggestion}"`;
        acceptSuggestionButton.classList.remove("hidden");
      } else {
        spellResult.textContent = `"${secretWord}" was not found as a real word. The host can still use it if it is a name or special word.`;
      }
    }
  } catch {
    spellResult.textContent = "The spelling checker is offline right now. You can still start the game.";
  } finally {
    spellCheckButton.disabled = false;
    startGameButton.classList.remove("hidden");
  }
}

function celebrate() {
  const colors = ["#ffc857", "#2ec4b6", "#ff6b6b", "#3772ff"];
  for (let index = 0; index < 28; index += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.style.left = `${45 + Math.random() * 10}%`;
    sparkle.style.top = `${34 + Math.random() * 18}%`;
    sparkle.style.background = colors[index % colors.length];
    sparkle.style.setProperty("--dx", `${(Math.random() - 0.5) * 360}px`);
    sparkle.style.setProperty("--dy", `${-80 - Math.random() * 220}px`);
    sparkleLayer.append(sparkle);
    window.setTimeout(() => sparkle.remove(), 1500);
  }

  [...wordDisplay.children].forEach((slot) => {
    if (slot.textContent) {
      slot.classList.remove("pop");
      window.requestAnimationFrame(() => slot.classList.add("pop"));
    }
  });

  hangmanCard.classList.add("cheer");
  window.setTimeout(() => hangmanCard.classList.remove("cheer"), 940);
}

function endGame(won) {
  letterInput.disabled = true;
  showStage("end");
  winCelebration.classList.toggle("hidden", !won);
  endTitle.textContent = won ? "You saved the day!" : "Good try!";
  endMessage.textContent = won
    ? `The word was "${secretWord}". Brilliant guessing.`
    : `The word was "${secretWord}". Time for another round.`;
}

function askForExtraGuesses() {
  letterInput.disabled = true;
  statusText.textContent = "You reached 6 wrong guesses.";
  showStage("extra");
}

function continueWithExtraGuesses() {
  extraGuessesActive = true;
  letterInput.disabled = false;
  statusText.textContent = "You have 3 extra guesses. Look for a helpful letter!";
  renderGame();
  showStage("play");
  letterInput.focus();
}

function handleGuess(value) {
  const letter = cleanWord(value).slice(0, 1);
  letterInput.value = "";

  if (!letter) {
    statusText.textContent = "Type one letter to guess.";
    return;
  }

  if (guessed.has(letter)) {
    statusText.textContent = `You already guessed ${letter.toUpperCase()}.`;
    return;
  }

  const isRight = secretWord.includes(letter);
  guessed.set(letter, isRight);

  if (isRight) {
    revealedLetters.add(letter);
    statusText.textContent = `${letter.toUpperCase()} is in the word!`;
    renderGame();
    celebrate();
  } else {
    wrongGuesses += 1;
    statusText.textContent = `${letter.toUpperCase()} is not in the word.`;
    renderGame();
    hangmanCard.classList.add("shake", "glow");
    window.setTimeout(() => hangmanCard.classList.remove("shake", "glow"), 760);
  }

  const allRevealed = [...secretWord].every((letterInWord) => revealedLetters.has(letterInWord));
  if (allRevealed) {
    window.setTimeout(() => endGame(true), 650);
  } else if (wrongGuesses >= defaultWrongGuessLimit && !extraGuessesActive) {
    window.setTimeout(askForExtraGuesses, 500);
  } else if (wrongGuesses >= maxWrongGuesses) {
    window.setTimeout(() => endGame(false), 450);
  }
}

wordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const cleaned = cleanWord(secretWordInput.value);

  if (cleaned.length < 5) {
    setupHint.textContent = "Please choose a word with 5 or more letters.";
    secretWordInput.focus();
    return;
  }

  secretWord = cleaned;
  resetSpellingCheck();
  showStage("spell");
});

toggleWordButton.addEventListener("click", () => {
  setSecretWordVisible(secretWordInput.type === "password");
});

skipSpellButton.addEventListener("click", startGame);
spellCheckButton.addEventListener("click", checkSpelling);
acceptSuggestionButton.addEventListener("click", () => {
  if (!spellingSuggestion) {
    return;
  }

  secretWord = spellingSuggestion;
  secretWordInput.value = spellingSuggestion;
  spellResult.textContent = `Using "${spellingSuggestion}" for this round.`;
  acceptSuggestionButton.classList.add("hidden");
  startGameButton.classList.remove("hidden");
});
startGameButton.addEventListener("click", startGame);

guessForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleGuess(letterInput.value);
});

letterInput.addEventListener("input", () => {
  letterInput.value = cleanWord(letterInput.value).toUpperCase();
});

playAgainButton.addEventListener("click", resetGame);
restartButton.addEventListener("click", resetGame);
extraYesButton.addEventListener("click", continueWithExtraGuesses);
extraNoButton.addEventListener("click", () => endGame(false));

resetGame();
