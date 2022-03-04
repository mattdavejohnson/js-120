// OO Twenty-One

let readline = require('readline-sync');

class Card {
  constructor(value, suit, points) {
    this.value = value;
    this.suit = suit;
    this.points = points;
  }

  getCard() {
    return `${this.value} of ${this.suit}`;
  }

  getPoints() {
    return this.points;
  }
}

class Deck {
  constructor() {
    this.reset();
  }

  static SUITS = [
    ['C', 'Clubs'],
    ['H', 'Hearts'],
    ['S', 'Spades'],
    ['D', 'Diamonds'],
  ];

  static VALUES = [
    ['2', 'Two', 2],
    ['3', 'Three', 3],
    ['4', 'Four', 4],
    ['5', 'Five', 5],
    ['6', 'Six', 6],
    ['7', 'Seven', 7],
    ['8', 'Eight', 8],
    ['9', 'Nine', 9],
    ['10', 'Ten', 10],
    ['J', 'Jack', 10],
    ['Q', 'Queen', 10],
    ['K', 'King', 10],
    ['A', 'Ace', 11],
  ];

  dealHand() {
    let card1 = this.cards.pop();
    let card2 = this.cards.pop();

    return [card1, card2];
  }

  dealCard() {
    let card = this.cards.pop();

    return card;
  }

  shuffle() {
    let array = this.cards;

    for (let index = array.length - 1; index > 0; index--) {
      let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
      [array[index], array[otherIndex]] = [array[otherIndex], array[index]]; // swap elements
    }
  }

  reset() {
    this.cards = [];

    for (let idx1 = 0; idx1 < Deck.SUITS.length; idx1 += 1) {
      for (let idx2 = 0; idx2 < Deck.VALUES.length; idx2 += 1) {
        // let titleValue = Deck.VALUES[idx2][0];
        // let titleSuit = Deck.SUITS[idx1][0];

        let propValue = Deck.VALUES[idx2][1];
        let propSuit = Deck.SUITS[idx1][1];
        let propPoints = Deck.VALUES[idx2][2];

        let currentCard = new Card(propValue, propSuit, propPoints);

        this.cards.push(currentCard);
      }

      this.shuffle(this.cards);
    }
  }
}

class Participant {
  constructor() {
    this.hand = [];
    this.score = 0;
  }

  hasBlackjack() {
    return this.score === 21;
  }

  isBusted() {
    return this.score > 21;
  }

  getScore() {
    return this.score;
  }

  getHand() {
    return this.hand;
  }

  calculateScore() {
    let values = this.hand.map((obj) => obj.points);
    let sum = 0;

    values.forEach((value) => {
      sum += value;
    });

    // correct for Aces
    values
      .filter((value) => value === 11)
      .forEach((_) => {
        if (sum > 21) sum -= 10;
      });

    return sum;
  }

  updateScore() {
    this.score = this.calculateScore();
  }
}

class Player extends Participant {
  constructor() {
    super();
    this.money = 5;
  }

  getMoney() {
    return this.money;
  }

  addOneDollar() {
    this.money += 1;
  }

  subtractOneDollar() {
    this.money -= 1;
  }
}

class Dealer extends Participant {
  // constructor() {
  //   super();
  // }

  getOneCard() {
    return this.hand[0];
  }

  mustStand() {
    return this.score >= 17;
  }
}

class TwentyOneGame {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
  }

  start() {
    this.displayWelcomeMessage();
    this.anyButton();
    this.mainGame();
    this.displayGoodbyeMessage();
  }

  mainGame() {
    while (this.player.getMoney() < 10 && this.player.getMoney() > 0) {
      this.deck.reset();
      console.clear();
      this.dealCards();
      this.playerTurn();

      if (this.player.isBusted()) {
        this.playerBustedMessage();
        continue;
      }
      if (this.player.hasBlackjack()) {
        this.playerHasBlackjackMessage();
        continue;
      }

      this.dealerTurn();
      this.displayResult();
      console.log('');
      this.anyButton();
    }
  }

  dealCards() {
    this.player.hand = this.deck.dealHand();
    this.dealer.hand = this.deck.dealHand();
  }

  showCards() {
    this.displayPlayerHand();
    this.displayPlayerScore();
    this.displayPlayerMoney();
    console.log('');
    this.displayOneDealerCard();
  }

  showBothDealerCards() {
    this.displayPlayerHand();
    this.displayPlayerScore();
    this.displayPlayerMoney();
    console.log('');
    this.displayAllDealerCards();
    this.displayDealerScore();
  }

  playerTurn() {
    this.showCards();

    while (!this.player.isBusted() && !this.player.hasBlackjack()) {
      if (this.wantToHit()) {
        this.playerHit();
        this.showCards();
      } else {
        break;
      }
    }
  }

  wantToHit() {
    let answer;

    while (true) {
      console.log('');
      answer = readline.question('Want to hit? (y/n) ').toLowerCase();

      if (['y', 'n'].includes(answer)) break;

      console.log("Sorry, that's not a valid choice.");
    }

    console.clear();
    return answer === 'y';
  }

  playerHit() {
    console.clear();
    this.player.hand.push(this.deck.dealCard());
    this.player.updateScore();
  }

  playerBustedMessage() {
    console.log('');
    console.log('You busted! Sorry you lose $1');
    console.log('');
    this.player.subtractOneDollar();
    this.displayPlayerMoney();
    this.anyButton();
  }

  playerHasBlackjackMessage() {
    console.log('');
    console.log('You have Blackjack! You win $1!');
    console.log('');
    this.player.addOneDollar();
    this.displayPlayerMoney();
    this.anyButton();
  }

  dealerTurn() {
    this.showBothDealerCards();
    this.anyButton();

    while (
      !this.dealer.isBusted() &&
      !this.dealer.hasBlackjack() &&
      !this.dealer.mustStand()
    ) {
      this.dealerHit();
      this.showBothDealerCards();
      this.anyButton();
    }
  }

  dealerHit() {
    console.clear();
    this.dealer.hand.push(this.deck.dealCard());
    this.dealer.updateScore();
  }

  anyButton() {
    console.log('');
    readline.question('***PRESS "ENTER" TO CONTINUE***');
    console.log('');
  }

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to 21!');
    console.log('');
    console.log('RULES: ');
    console.log('===================');
    console.log('You start with $5.');
    console.log('Each time you lose a hand, you lose $1.');
    console.log('Each time you win a hand, you gain $1.');
    console.log('You win the game if you get to $10.');
    console.log('You lose the game if you get to $0.');
    console.log('');
    console.log('Good luck! Have fun!');
  }

  displayGoodbyeMessage() {
    if (this.player.getMoney() === 10) {
      console.log('You got $10! You win!');
    } else {
      console.log('Sorry, you have $0. You lose.');
    }
    console.log('');
    console.log('Thank you for playing 21!');
  }

  displayPlayerHand() {
    console.log('Your current hand: ');
    console.log('===================');

    let arr = this.player.hand;
    arr.forEach((obj) => {
      console.log(`${obj.getCard()}`);
    });
  }

  displayPlayerScore() {
    this.player.updateScore();
    console.log('');
    console.log(`Current score: ${this.player.getScore()}`);
  }

  displayPlayerMoney() {
    console.log(`Current money: $${this.player.getMoney()}`);
  }

  displayOneDealerCard() {
    console.log("Dealer's current hand: ");
    console.log('===================');
    console.log(this.dealer.getOneCard().getCard());
    console.log('Second card hidden');
  }

  displayAllDealerCards() {
    console.log("Dealer's current hand: ");
    console.log('===================');

    let arr = this.dealer.hand;
    arr.forEach((obj) => {
      console.log(`${obj.getCard()}`);
    });
  }

  displayDealerScore() {
    this.dealer.updateScore();
    console.log('');
    console.log(`Dealer's current score: ${this.dealer.getScore()}`);
  }

  displayResult() {
    console.clear();
    console.log('Final Score: ');
    console.log('===================');
    console.log(`Player: ${this.player.getScore()}`);
    console.log(`Dealer: ${this.dealer.getScore()}`);
    console.log('');
    console.log(this.getResult());
    console.log('');
    this.displayPlayerMoney();
  }

  getResult() {
    if (
      this.player.getScore() > this.dealer.getScore() ||
      this.dealer.isBusted()
    ) {
      this.player.addOneDollar();
      return 'Congratulations! You win $1!';
    } else if (this.player.getScore() < this.dealer.getScore()) {
      this.player.subtractOneDollar();
      return 'Dealer wins. Sorry you lose $1';
    } else {
      return "It's a tie!";
    }
  }
}

let game = new TwentyOneGame();
game.start();
