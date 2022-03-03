/* eslint-disable no-mixed-operators */
/* eslint-disable max-lines-per-function */
// OO Tic Tac Toe with Bonus Features

let readline = require('readline-sync');

class Square {
  static UNUSED_SQUARE = ' ';
  static HUMAN_MARKER = 'X';
  static COMPUTER_MARKER = 'O';

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

  getMarker() {
    return this.marker;
  }
}

class Board {
  constructor() {
    this.reset();
  }

  reset() {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[String(counter)] = new Square();
    }
  }

  display() {
    console.log('');
    console.log('     |     |');
    console.log(
      `  ${this.squares['1']}  |  ${this.squares['2']}  |  ${this.squares['3']}`
    );
    console.log('     |     |');
    console.log('-----+-----+-----');
    console.log('     |     |');
    console.log(
      `  ${this.squares['4']}  |  ${this.squares['5']}  |  ${this.squares['6']}`
    );
    console.log('     |     |');
    console.log('-----+-----+-----');
    console.log('     |     |');
    console.log(
      `  ${this.squares['7']}  |  ${this.squares['8']}  |  ${this.squares['9']}`
    );
    console.log('     |     |');
    console.log('');
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter((key) => this.isUnusedSquare(key));
  }

  isUnusedSquare(key) {
    return this.squares[key].isUnused();
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter((key) => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }

  displayWithClear() {
    console.clear();
    console.log('');
    console.log('');
    this.display();
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
    this.score = 0;
  }

  getScore() {
    return this.score;
  }

  incrementScore() {
    this.score += 1;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    ['1', '2', '3'], // top row of board
    ['4', '5', '6'], // center row of board
    ['7', '8', '9'], // bottom row of board
    ['1', '4', '7'], // left column of board
    ['2', '5', '8'], // middle column of board
    ['3', '6', '9'], // right column of board
    ['1', '5', '9'], // diagonal: top-left to bottom-right
    ['3', '5', '7'], // diagonal: bottom-left to top-right
  ];

  static MATCH_GOAL = 3;

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.firstPlayer = this.human;
  }

  play() {
    this.displayWelcomeMessage();
    this.playMatch();
    this.displayGoodbyeMessage();
  }

  playMatch() {
    console.log(
      `First player to win ${TTTGame.MATCH_GOAL} games wins the match.`
    );

    while (true) {
      this.playOneGame();
      this.updateMatchScore();
      this.displayMatchScore();

      if (this.matchOver()) break;
      if (!this.playAgain()) break;
      this.firstPlayer = this.togglePlayer(this.firstPlayer);
    }

    this.displayMatchResults();
  }

  playOneGame() {
    let currentPlayer = this.firstPlayer;

    this.board.reset();
    this.board.display();

    while (true) {
      this.playerMoves(currentPlayer);
      if (this.gameOver()) break;

      this.board.displayWithClear();
      currentPlayer = this.togglePlayer(currentPlayer);
    }

    this.board.displayWithClear();
    this.displayResults();
  }

  playAgain() {
    let answer;

    while (true) {
      answer = readline.question('Play again (y/n)? ').toLowerCase();

      if (['y', 'n'].includes(answer)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log('');
    }

    console.clear();
    return answer === 'y';
  }

  togglePlayer(player) {
    return player === this.human ? this.computer : this.human;
  }

  playerMoves(currentPlayer) {
    if (currentPlayer === this.human) {
      this.humanMoves();
    } else {
      this.computerMoves();
    }
  }

  matchOver() {
    return this.isMatchWinner(this.human) || this.isMatchWinner(this.computer);
  }

  isMatchWinner(player) {
    return player.getScore() >= TTTGame.MATCH_GOAL;
  }

  updateMatchScore() {
    if (this.isWinner(this.human)) {
      this.human.incrementScore();
    } else if (this.isWinner(this.computer)) {
      this.computer.incrementScore();
    }
  }

  displayMatchScore() {
    let human = this.human.getScore();
    let computer = this.computer.getScore();
    console.log(`Current match score: [you: ${human}] [computer: ${computer}]`);
  }

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Tic Tac Toe!');
    console.log('');
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic Tac Toe! Goodbye!');
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log('You won! Congratulations!');
    } else if (this.isWinner(this.computer)) {
      console.log('I won! I won! Take that, human!');
    } else {
      console.log('A tie game. How boring.');
    }
  }

  displayMatchResults() {
    if (this.human.getScore() > this.computer.getScore()) {
      console.log('You won this match! Congratulations!');
    } else if (this.human.getScore() < this.computer.getScore()) {
      console.log('Oh, boo hoo. You lost the match!');
    }
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${this.joinOr(validChoices)}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log('');
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let choice = this.offensiveComputerMove();
    if (!choice) {
      choice = this.defensiveComputerMove();
    }

    if (!choice) {
      choice = this.pickCenterSquare();
    }

    if (!choice) {
      choice = this.pickRandomSquare();
    }

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  pickCenterSquare() {
    return this.board.isUnusedSquare('5') ? '5' : null;
  }

  pickRandomSquare() {
    let validChoices = this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor(9 * Math.random() + 1).toString();
    } while (!validChoices.includes(choice));

    return choice;
  }

  offensiveComputerMove() {
    return this.findCriticalSquare(this.computer);
  }

  defensiveComputerMove() {
    return this.findCriticalSquare(this.human);
  }

  findCriticalSquare(player) {
    for (
      let index = 0;
      index < TTTGame.POSSIBLE_WINNING_ROWS.length;
      index += 1
    ) {
      let row = TTTGame.POSSIBLE_WINNING_ROWS[index];
      let key = this.criticalSquare(row, player);
      if (key) return key;
    }

    return null;
  }

  criticalSquare(row, player) {
    if (this.board.countMarkersFor(player, row) === 2) {
      let index = row.findIndex((key) => this.board.isUnusedSquare(key));
      if (index >= 0) return row[index];
    }

    return null;
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some((row) => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  joinOr(array, spacer = ', ', word = 'or') {
    if (array.length === 1) {
      return String(array[0]);
    }

    let result = '';

    for (let index = 0; index < array.length; index += 1) {
      if (index === array.length - 1) {
        result += `${word} ${array[index]}`;
        continue;
      }

      result += `${array[index]}${spacer}`;
    }

    return result;
  }
}

let game = new TTTGame();
game.play();
