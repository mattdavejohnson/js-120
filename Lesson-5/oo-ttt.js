/* eslint-disable no-useless-constructor */
// OO Tic Tac Toe with Classes

class Board {
  constructor() {
    // STUB
    //  We need a way to model the 3x3 grid. Perhaps "squares"?
    //  What data structure should we use? Array? Object?
    //  What should the data structure store? Strings? Numbers? Square objects?
  }
}

class Square {
  constructor() {
    // STUB
    //  We need some way to keep track of this square's marker.
  }
}

class Row {
  constructor() {
    // STUB
    //  We need some way to identify a row of 3 squares.
  }
}

class Marker {
  constructor() {
    // STUB
    //  A marker is something that represents a player's "piece" on the board.
  }
}

class Player {
  constructor() {
    // STUB
    //  maybe a "marker" to keep track of this player's symbol ('X' or 'O')
  }

  mark() {
    // STUB
    //  We need a way to mark the board with this player's marker.
    //  How do we access the board?
  }

  play() {
    // STUB
    //  We need a way for each player to play the game.
    //  Do we need access to the board?
  }
}

class Human extends Player {
  constructor() {
    // STUB
  }
}

class Computer extends Player {
  constructor() {
    // STUB
  }
}

class TTTGame {
  constructor() {
    // STUB
    //  Need a board and two players
  }

  play() {
    // SPIKE
    this.displayWelcomeMessage();

    while (true) {
      this.displayBoard();

      this.firstPlayerMoves();
      if (this.gameOver()) break;

      this.secondPlayerMoves();
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

  displayBoard() {
    // STUB
    //  Display the board, including its current state
  }

  firstPlayerMoves() {
    // STUB
    //  The first player makes a move
  }

  secondPlayerMoves() {
    // STUB
    //  The second player makes a move
  }

  gameOver() {
    // STUB
    return false;
  }
}

let game = new TTTGame();
game.play();
