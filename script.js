var allCell = document.querySelectorAll(".cell");
var gameDisplay = document.getElementById("game-display");
var currentPlayer = "X";
var gameActive = true;
var gameState = ["", "", "", "", "", "", "", "", ""];
var gameRules = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

for (let i = 0; i < allCell.length; i++) {
  const element = allCell[i];
  element.addEventListener("click", cellClicked);
}

gameDisplay.innerHTML = playerTurn();

function cellClicked(event) {
  // ovdje radimo setovanje celije
  var cellSelected = event.target;
  var cellIndex = parseInt(cellSelected.getAttribute("data-cell-index"));

  if (gameState[cellIndex] !== "" || !gameActive) return;

  handleCellSelected(cellSelected, cellIndex);
  handleGameRules();
}

function handleCellSelected(cellSelected, cellIndex) {
  // logika za popunjavanje game state
  cellSelected.innerHTML = currentPlayer;
  gameState[cellIndex] = currentPlayer;
  console.log(gameState);
}

function handleGameRules() {
  var won = false;
  for (let i = 0; i < gameRules.length; i++) {
    // [0,1,2]
    const rule = gameRules[i];
    var a = gameState[rule[0]]; // X
    var b = gameState[rule[1]]; // ''
    var c = gameState[rule[2]]; // X

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      won = true;
      break;
    }
  }

  if (won) {
    gameDisplay.innerHTML = winMessage();
    gameActive = false;
    return;
  }

  var draw = !gameState.includes("");
  if (draw) {
    gameDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  changePlayer();
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameDisplay.innerHTML = playerTurn();
}

function winMessage() {
  return `Pobjedio je igrac ${currentPlayer}`;
}

function drawMessage() {
  return "Nerijeseno pokusajte ponovo";
}

function playerTurn() {
  return `Na potezu je igrac ${currentPlayer}`;
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameDisplay.innerHTML = playerTurn();
  for (let i = 0; i < allCell.length; i++) {
    const element = allCell[i];
    element.innerHTML = "";
  }
}
