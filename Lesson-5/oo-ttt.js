/* eslint-disable no-mixed-operators */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-useless-constructor */
// OO Tic Tac Toe with Classes

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
}

class Board {
  constructor() {
    // STUB
    //  We need a way to model the 3x3 grid. Perhaps "squares"?
    //  What data structure should we use? Array? Object?
    //  What should the data structure store? Strings? Numbers? Square objects?
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[String(counter)] = new Square();
    }
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
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
}

class Row {
  constructor() {
    // STUB
    //  We need some way to identify a row of 3 squares.
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  play() {
    // STUB
    //  We need a way for each player to play the game.
    //  Do we need access to the board?
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
  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    // SPIKE
    this.displayWelcomeMessage();

    while (true) {
      this.board.display();

      this.humanMoves();
      this.board.display();
      if (this.gameOver()) break;

      this.computerMoves();
      this.board.display();
      if (this.gameOver()) break;
      break; // execute loop only once for now
    }

    this.displayResults();
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    console.log('Welcome to Tic Tac Toe!');
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic Tac Toe! Goodbye!');
  }

  displayResults() {
    // STUB
    //  Show the results of this game (win, lose, tie)
  }

  humanMoves() {
    let choice;

    while (true) {
      choice = readline.question('Choose a square between 1 and 9: ');

      let integerValue = parseInt(choice, 10);
      if (integerValue >= 1 && integerValue <= 9) {
        break;
      }

      console.log("Sorry, that's not a valid choice.");
      console.log('');
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let choice = Math.floor(9 * Math.random() + 1);
    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  gameOver() {
    // STUB
    return false;
  }
}

let game = new TTTGame();
game.play();
