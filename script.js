let boardState = ['', '', '', '', '', '', '', '', ''];
let turn = 'X';
let winner = null;
const board = document.querySelector('.board');
const message = document.querySelector('.message');
const restartButton = document.querySelector('.restart');

function renderBoard() {
    board.innerHTML = '';
    boardState.forEach((cell, index) => {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.textContent = cell;
      tile.addEventListener('click', () => handleClick(index));
      board.appendChild(tile);
    });
  }
  

function handleClick(index) {
  if (winner !== null || boardState[index] !== '') {
    return;
  }
  
  boardState[index] = turn;
  renderBoard();
  checkWin();
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
  
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      winner = turn;
      message.textContent = `${turn} has won!`;
      endGame(`${turn} has won!`);
      return;
    }
  }

  if (!boardState.includes('')) {
    message.textContent = "It's a tie!";
    endGame("It's a tie!");
  } else {
    turn = turn === 'X' ? 'O' : 'X';
    message.textContent = `It's ${turn}'s turn.`;
  }
}

function animateBalloons() {
  const colors = ['#FFD700', '#FF69B4', '#00FFFF', '#FFA500', '#7B68EE', '#8FBC8F'];
  const container = document.querySelector('.container');

  for (let i = 0; i < 30; i++) {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.animationDelay = `${i / 10}s`;
    container.appendChild(balloon);
  }
}

function endGame(result) {
  board.removeEventListener('click', handleClick);
  restartButton.style.display = 'block';
  animateBalloons();
}

function restart() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  turn = 'X';
  winner = null;
  message.textContent = `It's ${turn}'s turn.`;
  renderBoard();
  restartButton.style.display = 'none';
  board.addEventListener('click', handleClick);
}

renderBoard();
message.textContent = `It's ${turn}'s turn.`;
board.addEventListener('click', handleClick);
restartButton.addEventListener('click', restart);
