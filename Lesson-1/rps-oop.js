/*
Object Oriented Rock Paper Scissors

*/

const readline = require('readline-sync');

function createPlayer() {
  return {
    move: null,
    score: 0,
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const choices = ['rock', 'paper', 'scissors'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('Please choose rock, paper, or scissors:');
        choice = readline.question();
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}

const RPSGame = {
  SCORE_TO_WIN: 3,
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
    console.log('');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  displayScore() {
    console.log('First to 3 wins!');
    console.log('Current Score:');
    console.log('================');
    console.log(`Player Score: ${this.human.score}`);
    console.log(`Computer Score: ${this.computer.score}`);
    console.log('');
  },

  displayFinalScore() {
    console.log('Final Score:');
    console.log('================');
    console.log(`Player Score: ${this.human.score}`);
    console.log(`Computer Score: ${this.computer.score}`);
    console.log('');
  },

  compare(humanMove, computerMove) {
    if (
      (humanMove === 'rock' && computerMove === 'scissors') ||
      (humanMove === 'paper' && computerMove === 'rock') ||
      (humanMove === 'scissors' && computerMove === 'paper')
    ) {
      this.human.score += 1;
      console.log('You win!');
    } else if (
      (humanMove === 'rock' && computerMove === 'paper') ||
      (humanMove === 'paper' && computerMove === 'scissors') ||
      (humanMove === 'scissors' && computerMove === 'rock')
    ) {
      this.computer.score += 1;
      console.log('Computer wins!');
    } else {
      console.log("It's a tie!");
    }
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    this.compare(humanMove, computerMove);
  },

  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  continue() {
    console.log('');
    console.log('Please press Enter to continue to next round.');
    readline.question();
  },

  play() {
    console.clear();
    this.displayWelcomeMessage();

    while (
      this.human.score < this.SCORE_TO_WIN &&
      this.computer.score < this.SCORE_TO_WIN
    ) {
      this.displayScore();
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      this.continue();
      // if (!this.playAgain()) break;
      console.clear();
    }

    this.displayFinalScore();
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();
