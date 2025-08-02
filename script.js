const rows = 6;
const cols = 7;
let currentPlayer = 'red';
let board = [];
let gameOver = false;

window.onload = function () {
  initBoard();
};

function initBoard() {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';

  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < cols; c++) {
      board[r][c] = '';

      let tile = document.createElement('div');
      tile.id = `${r}-${c}`;
      tile.classList.add('tile');
      tile.addEventListener('click', dropPiece);
      boardElement.append(tile);
    }
  }
}

function dropPiece() {
  if (gameOver) return;

  let coords = this.id.split('-');
  let c = parseInt(coords[1]);

  for (let row = rows - 1; row >= 0; row--) {
    if (board[row][c] === '') {
      board[row][c] = currentPlayer;
      let tile = document.getElementById(`${row}-${c}`);
      tile.classList.add(currentPlayer);

      if (checkWinner(row, c)) {
        document.getElementById('winner').innerText = `${currentPlayer.toUpperCase()} wins!`;
        showSparkles(currentPlayer === 'red' ? 'red' : 'yellow');
        gameOver = true;
      }

      currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
      return;
    }
  }
}

function checkWinner(r, c) {
  return (
    checkDirection(r, c, 0, 1) + checkDirection(r, c, 0, -1) > 2 || // horizontal
    checkDirection(r, c, 1, 0) > 2 || // vertical
    checkDirection(r, c, 1, 1) + checkDirection(r, c, -1, -1) > 2 || // diagonal \
    checkDirection(r, c, 1, -1) + checkDirection(r, c, -1, 1) > 2 // diagonal /
  );
}

function checkDirection(r, c, dr, dc) {
  let count = 0;
  let i = 1;

  while (true) {
    let row = r + dr * i;
    let col = c + dc * i;

    if (
      row < 0 || row >= rows ||
      col < 0 || col >= cols ||
      board[row][col] !== currentPlayer
    ) {
      break;
    }

    count++;
    i++;
  }

  return count;
}

function restartGame() {
  currentPlayer = 'red';
  board = [];
  gameOver = false;
  document.getElementById('winner').innerText = '';
  document.getElementById('sparkles').innerHTML = '';
  initBoard();
}

function showSparkles(color) {
  const sparkleContainer = document.getElementById('sparkles');
  sparkleContainer.innerHTML = ''; // Clear old sparkles

  for (let i = 0; i < 50; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.backgroundColor = color;
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 20 + 'vh';
    sparkleContainer.appendChild(sparkle);
  }

  setTimeout(() => {
    sparkleContainer.innerHTML = '';
  }, 1000);
}
