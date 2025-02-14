const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status-text");
const restartButton = document.querySelector("#restart-button");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
let xScore = 0;
let oScore = 0;

initializeGame();

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartButton.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] !== "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer === "X" ? "x-cell" : "o-cell");
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }

    if (cellA == cellB && cellB == cellC) {
      roundWon = true;

      condition.forEach((index) => {
        cells[index].classList.add("winning-cell");
      });

      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    if (currentPlayer === "X") {
      xScore++;
      document.getElementById("x-score").textContent = xScore;
    } else {
      oScore++;
      document.getElementById("o-score").textContent = oScore;
    }
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `It's a draw!`;
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
  cells.forEach((cell) => cell.classList.remove("winning-cell"));
}

// MODAL

const showInstructionsButton = document.getElementById("show-instructions");
const closeInstructionsButton = document.getElementById("close-instructions");
const modal = document.getElementById("modal");

showInstructionsButton.addEventListener("click", () => {
  modal.classList.add("show-modal");
});

closeInstructionsButton.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

// THEMES

document.addEventListener("DOMContentLoaded", () => {
  const themeSelector = document.getElementById("themes");
  const gameContainer = document.getElementById("game-container");

  gameContainer.classList.add("light-theme");

  themeSelector.addEventListener("change", (e) => {
    const selectedTheme = e.target.value;

    gameContainer.classList.remove(
      "light-theme",
      "dark-theme",
      "ocean-theme",
      "forest-theme",
      "retro-theme"
    );

    switch (selectedTheme) {
      case "light":
        gameContainer.classList.add("light-theme");
        break;
      case "dark":
        gameContainer.classList.add("dark-theme");
        break;
      case "ocean":
        gameContainer.classList.add("ocean-theme");
        break;
      case "forest":
        gameContainer.classList.add("forest-theme");
        break;
      case "retro":
        gameContainer.classList.add("retro-theme");
        break;
      default:
        gameContainer.classList.add("light-theme");
    }
  });
});
