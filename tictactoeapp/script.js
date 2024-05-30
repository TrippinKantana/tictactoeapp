const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const result = document.getElementById("result");
const winMessage = document.getElementById("win-message");
const playAgainButton = document.getElementById("play-again-button");
const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
const tieSound = document.getElementById("tie-sound");
let currentPlayer = "X";
let gameOver = false;

function makeMove(cellIndex) {
  if (gameOver || cells[cellIndex].textContent !== "") return;
  cells[cellIndex].textContent = currentPlayer;
  cells[cellIndex].classList.add("occupied");
  if (checkWin()) {
    gameOver = true;
    result.style.display = "block";
    winMessage.textContent = `Player ${currentPlayer} wins!`;
    playSound(winSound);
  } else if ([...cells].every((cell) => cell.textContent !== "")) {
    gameOver = true;
    result.style.display = "block";
    winMessage.textContent = "It's a draw!";
    playSound(tieSound);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWin() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombos.some((combo) => {
    const [a, b, c] = combo;
    return (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    );
  });
}

function resetBoard() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("occupied");
  });
  currentPlayer = "X";
  gameOver = false;
  result.style.display = "none";
}

playAgainButton.addEventListener("click", resetBoard);

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
