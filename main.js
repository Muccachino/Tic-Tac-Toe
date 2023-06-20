"use strict";

let turnCounter = 1;

class Gameboard {
  constructor() {
    this.players = [];
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
        this.board[7] === this.board[9] &&
        this.board[3] != 0)
    ) {
      showWinner();
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
  console.log(gameboard.players[0], gameboard.players[1]);
  console.log(gameboard.players);

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
      turnCounter === 1 &&
      gameboard.board[parseInt(targetElement.dataset.field)] === 0
    ) {
      createCircle(targetElement);
      gameboard.board[parseInt(targetElement.dataset.field)] = 1;
      gameboard.checkWin();
      turnCounter = 2;
      showPlayerTurn();
    } else if (
      turnCounter === 2 &&
      gameboard.board[parseInt(targetElement.dataset.field)] === 0
    ) {
      createCross(targetElement);
      gameboard.board[parseInt(targetElement.dataset.field)] = 2;
      gameboard.checkWin();
      turnCounter = 1;
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

const showWinner = () => {
  let gameBoard = document.querySelector(".gameBoard");
  let winnerPage = document.querySelector(".winner");
  gameBoard.classList.toggle("hide");
  winnerPage.classList.toggle("hide");

  let winnerOutput = document.querySelector("#winnerOutput");
  if (turnCounter === 1) {
    winnerOutput.innerHTML = gameboard.players[0].name + " is the winner!";
  } else {
    winnerOutput.innerHTML = gameboard.players[1].name + " is the winner!";
  }
};

const showGameBoard = () => {
  let header = document.querySelector("header");
  let playerChoice = document.querySelector(".playerChoice");
  let gameBoard = document.querySelector(".gameBoard");

  header.classList.toggle("hide");
  playerChoice.classList.toggle("hide");
  gameBoard.classList.toggle("hide");
};

const showPlayerTurn = () => {
  let playerTurn = document.querySelector("#playerTurn");
  if (turnCounter === 1) {
    playerTurn.innerHTML = gameboard.players[0].name + " is next !";
  } else {
    playerTurn.innerHTML = gameboard.players[1].name + " is next !";
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

const newGame = (() => {
  const newGameButton = document.querySelector("#newGame");
  const restartButton = document.querySelector("#restart");

  newGameButton.addEventListener("click", restart);
  restartButton.addEventListener("click", restart);
})();
