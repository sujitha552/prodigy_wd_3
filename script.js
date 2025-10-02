const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const statusDiv = document.getElementById('status');

let board = Array(9).fill(null);  // holds 'X', 'O', or null
let currentPlayer = 'X';
let gameOver = false;

const winningLines = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function checkWinner() {
  for (let line of winningLines) {
    const [a, b, c] = line;
    if (
      board[a] && 
      board[a] === board[b] && 
      board[a] === board[c]
    ) {
      return board[a];
    }
  }
  // If no winner but all cells are filled, it's a draw
  if (board.every(cell => cell !== null)) {
    return 'Draw';
  }
  return null;
}

function updateStatus() {
  const result = checkWinner();
  if (result === 'X' || result === 'O') {
    statusDiv.textContent = `Winner: ${result}`;
    gameOver = true;
  } else if (result === 'Draw') {
    statusDiv.textContent = `It's a draw`;
    gameOver = true;
  } else {
    statusDiv.textContent = `Next: ${currentPlayer}`;
  }
}

function handleCellClick(e) {
  const cell = e.target;
  const index = parseInt(cell.dataset.index);

  if (board[index] !== null || gameOver) {
    return;
  }

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  updateStatus();
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  cells.forEach(c => c.textContent = '');
  statusDiv.textContent = `Next: ${currentPlayer}`;
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// Initialize display
updateStatus();
