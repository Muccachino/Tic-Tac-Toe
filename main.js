"use strict";

class Gameboard {
  constructor() {
    this.players = [];
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.roundCounter = 0;
    this.playerTurnCounter = 1;
    this.playerOneWins = 0;
    this.playerTwoWins = 0;
  }
  addPlayer(name) {
    let player = new Player(name);
    this.players.push(player);
  }
  checkWin() {
    if (
      (this.board[1] === this.board[2] &&
        this.board[2] === this.board[3] &&
        this.board[1] === this.board[3] &&
        this.board[1] != 0) ||
      (this.board[4] === this.board[5] &&
        this.board[5] === this.board[6] &&
        this.board[4] === this.board[6] &&
        this.board[4] != 0) ||
      (this.board[7] === this.board[8] &&
        this.board[8] === this.board[9] &&
        this.board[7] === this.board[9] &&
        this.board[7] != 0) ||
      (this.board[1] === this.board[4] &&
        this.board[4] === this.board[7] &&
        this.board[1] === this.board[7] &&
        this.board[1] != 0) ||
      (this.board[2] === this.board[5] &&
        this.board[5] === this.board[8] &&
        this.board[2] === this.board[8] &&
        this.board[2] != 0) ||
      (this.board[3] === this.board[6] &&
        this.board[6] === this.board[9] &&
        this.board[3] === this.board[9] &&
        this.board[3] != 0) ||
      (this.board[1] === this.board[5] &&
        this.board[5] === this.board[9] &&
        this.board[1] === this.board[9] &&
        this.board[1] != 0) ||
      (this.board[3] === this.board[5] &&
        this.board[5] === this.board[7] &&
        this.board[3] === this.board[7] &&
        this.board[3] != 0)
    ) {
      showWinner();
    } else if (this.roundCounter === 9) {
      showDraw();
    }
  }
}

const gameboard = new Gameboard();

class Player {
  constructor(name) {
    this.name = name;
  }
}

const getPlayerNames = () => {
  let playerOne = document.querySelector("#playerOne");
  playerOne = playerOne.value;
  let playerTwo = document.querySelector("#playerTwo");
  playerTwo = playerTwo.value;
  checkPlayerInput(playerOne, playerTwo);
};

const checkPlayerInput = (playerOne, playerTwo) => {
  if (playerOne === "" || playerTwo === "") {
    const message = document.querySelector("#message");
    message.innerHTML = "Please insert both player names!";
  } else {
    createPlayers(playerOne, playerTwo);
  }
};

const createPlayers = (playerOne, playerTwo) => {
  let one = gameboard.addPlayer(playerOne);
  let two = gameboard.addPlayer(playerTwo);

  let boardNameOne = document.querySelector("#boardNameOne");
  let boardNameTwo = document.querySelector("#boardNameTwo");

  boardNameOne.innerHTML = gameboard.players[0].name;
  boardNameTwo.innerHTML = gameboard.players[1].name;
  showGameBoard();
};

const setMark = (e) => {
  let targetElement = e.target;
  if (targetElement.matches(".square")) {
    if (
      gameboard.playerTurnCounter === 1 &&
      gameboard.board[parseInt(targetElement.dataset.field)] === 0
    ) {
      createCircle(targetElement);
      gameboard.board[parseInt(targetElement.dataset.field)] = 1;
      gameboard.roundCounter += 1;
      gameboard.checkWin();
      gameboard.playerTurnCounter = 2;
      borderActivePlayer();
      showPlayerTurn();
    } else if (
      gameboard.playerTurnCounter === 2 &&
      gameboard.board[parseInt(targetElement.dataset.field)] === 0
    ) {
      createCross(targetElement);
      gameboard.board[parseInt(targetElement.dataset.field)] = 2;
      gameboard.roundCounter += 1;
      gameboard.checkWin();
      gameboard.playerTurnCounter = 1;
      borderActivePlayer();
      showPlayerTurn();
    }
  }
};

const createCircle = (targetElement) => {
  let circle = document.createElement("i");
  circle.classList.add("fa-regular", "fa-circle");
  targetElement.appendChild(circle);
};

const createCross = (targetElement) => {
  let cross = document.createElement("i");
  cross.classList.add("fa-solid", "fa-x");
  targetElement.appendChild(cross);
};

const borderActivePlayer = () => {
  const nameBoxOne = document.querySelector("#boardLeft");
  const nameBoxTwo = document.querySelector("#boardRight");
  if (gameboard.playerTurnCounter === 1) {
    nameBoxOne.classList.add("borderName");
    nameBoxTwo.classList.remove("borderName");
  } else {
    nameBoxOne.classList.remove("borderName");
    nameBoxTwo.classList.add("borderName");
  }
};

const showWinner = () => {
  let gameBoard = document.querySelector(".gameBoard");
  let winnerPage = document.querySelector(".winner");
  gameBoard.classList.toggle("hide");
  winnerPage.classList.toggle("hide");

  let winnerOutput = document.querySelector("#winnerOutput");
  let playerOneWins = document.querySelector("#playerOneWins");
  let playerTwoWins = document.querySelector("#playerTwoWins");

  if (gameboard.playerTurnCounter === 1) {
    winnerOutput.innerHTML = gameboard.players[0].name + " is the winner!";
    gameboard.playerOneWins += 1;
  } else {
    winnerOutput.innerHTML = gameboard.players[1].name + " is the winner!";
    gameboard.playerTwoWins += 1;
  }

  playerOneWins.innerHTML =
    gameboard.players[0].name + ": " + gameboard.playerOneWins;
  playerTwoWins.innerHTML =
    gameboard.players[1].name + ": " + gameboard.playerTwoWins;
};

const showDraw = () => {
  let gameBoard = document.querySelector(".gameBoard");
  let winnerPage = document.querySelector(".winner");
  gameBoard.classList.toggle("hide");
  winnerPage.classList.toggle("hide");

  let winnerOutput = document.querySelector("#winnerOutput");
  winnerOutput.innerHTML = "It`s a Draw!";
};

const showGameBoard = () => {
  let header = document.querySelector("header");
  let playerChoice = document.querySelector(".playerChoice");
  let gameBoard = document.querySelector(".gameBoard");

  header.classList.toggle("hide");
  playerChoice.classList.toggle("hide");
  gameBoard.classList.toggle("hide");
  showPlayerTurn();
};

const showPlayerTurn = () => {
  let playerTurn = document.querySelector("#playerTurn");
  if (gameboard.playerTurnCounter === 1) {
    playerTurn.innerHTML = gameboard.players[0].name + " is next !";
  } else {
    playerTurn.innerHTML = gameboard.players[1].name + " is next !";
  }
};

const replay = () => {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square) => {
    if (square.firstChild) {
      square.removeChild(square.firstChild);
    }
  });
  gameboard.board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  gameboard.roundCounter = 0;
  determineStartPlayer();
  borderActivePlayer();
  showPlayerTurn();
  showDraw();
};

const determineStartPlayer = () => {
  if ((gameboard.playerOneWins + gameboard.playerTwoWins) % 2 === 0) {
    gameboard.playerTurnCounter = 1;
  } else {
    gameboard.playerTurnCounter = 2;
  }
};

const restart = () => {
  location.reload();
};

const listenToClick = (() => {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square) => {
    square.addEventListener("click", setMark);
  });
})();

const gameStart = (() => {
  const startGame = document.querySelector("#startGame");
  startGame.addEventListener("click", getPlayerNames);
})();

const replayGame = (() => {
  const replayGameButton = document.querySelector("#replay");
  replayGameButton.addEventListener("click", replay);
})();

const newGame = (() => {
  const newGameButton = document.querySelector("#newGame");
  const restartButton = document.querySelector("#restart");

  newGameButton.addEventListener("click", restart);
  restartButton.addEventListener("click", restart);
})();
