const cells = document.querySelectorAll('.game-board div');
const reset = document.querySelector('.reset-btn')

const gameStatus = document.querySelector('.game-status h2');

let gameActive = true;

let currentPlayer = 'X'

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const winMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in draw`;
const currentPlayerTurn = () => `It's ${currentPlayer} turn`;

gameStatus.innerHTML = currentPlayerTurn();
gameStatus.style.color = "red"



const handleCellPlayed = (clickedCell, clickedCellIndex) => {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
  // change color of cells on input X or O
  if(clickedCell.innerHTML === "X"){
    clickedCell.style.backgroundColor = "coral"
  } else if(clickedCell.innerHTML === "O"){
    clickedCell.style.backgroundColor = "cyan"
  }
}


let counter1 = 0;
let counter2 = 0;

const handleResultValidation = () => {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      // flashing out the win condition cells
      winCondition.forEach((cellIndex) => {
        cells[cellIndex].classList.add('blink');
      })
      break;
    }
  }
  if (roundWon) {
    // scoreboard
    if (currentPlayer === 'X') {
      counter1++;
      document.querySelector('.player1').innerHTML = counter1;
    } else if (currentPlayer === 'O') {
      counter2++;
      document.querySelector('.player2').innerHTML = counter2;
    }

    gameStatus.innerHTML = winMessage();
    gameStatus.style.color = "green";
    gameActive = false;
    return;
  }

  //check for draw game
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    gameStatus.innerHTML = drawMessage();
    gameStatus.style.color = "blue";
    gameActive = false;
    return;
  }

  //player change

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameStatus.innerHTML = currentPlayerTurn();
  gameStatus.style.color = "red";
}


//main function
cells.forEach((cell) => {
  cell.addEventListener('click', (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
  })
});

//reset the game  
reset.addEventListener('click', () => {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameStatus.innerHTML = currentPlayerTurn();
  gameStatus.style.color = "red"
  cells.forEach(cell => {
    cell.innerHTML = "";
    cell.style.backgroundColor = "cornflowerblue";
    if(cell.classList.contains('blink')) {
      cell.classList.remove('blink')
    }
  })
});