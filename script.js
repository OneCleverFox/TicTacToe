const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const restartButton = document.querySelector('.restart-button');

let currentPlayer = 'X';
let gameIsOver = false;

function handleCellClick(event) {
  const cell = event.target;

  if (cell.textContent !== '' || gameIsOver) {
    return;
  }

  cell.textContent = currentPlayer;

  if (currentPlayer === 'X') {
    cell.style.color = 'red';
  } else {
    cell.style.color = 'green';
  }

  if (checkForWinner()) {
    message.textContent = `${currentPlayer} wins!`;
    gameIsOver = true;
  } else if (checkForTie()) {
    message.textContent = `Tie game!`;
    gameIsOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `${currentPlayer}'s turn`;
  }
}


function checkForWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    );
  });
}

function checkForTie() {
  return Array.from(cells).every(cell => cell.textContent !== '');
}

function handleRestartClick() {
  currentPlayer = 'X';
  gameIsOver = false;

  cells.forEach(cell => {
    cell.textContent = '';
  });

  message.textContent = `${currentPlayer}'s turn`;
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', handleRestartClick);
