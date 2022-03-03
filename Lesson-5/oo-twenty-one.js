// OO Twenty-One

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

  isBusted() {
    return this.score > 21;
  }

  getScore() {
    return this.score;
  }
}

class Player extends Participant {
  constructor() {
    super();
    this.money = 5;
  }

  hit() {
    //STUB
  }

  stay() {
    //STUB
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

class Dealer extends Participant {
  // Very similar to a Player; do we need this?

  constructor() {
    super();
  }

  hit() {
    //STUB
  }

  stay() {
    //STUB
  }

  score() {
    //STUB
  }

  hide() {
    //STUB
  }

  reveal() {
    //STUB
  }
}

class TwentyOneGame {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
  }

  start() {
    console.clear();
    this.displayWelcomeMessage();
    console.log('');
    this.dealCards();
    this.playerTurn();

    // this.dealerTurn();
    // this.displayResult();
    console.log('');
    this.displayGoodbyeMessage();
  }

  dealCards() {
    this.player.hand = this.deck.dealHand();
    this.player.updateScore();
    this.dealer.hand = this.deck.dealHand();
  }

  showCards() {
    console.log(this.player);
    console.log('');
    console.log(this.dealer);
  }

  playerTurn() {
    this.displayPlayerHand();
    this.playerHit();
    this.displayPlayerHand();
  }

  playerHit() {
    this.player.hand.push(this.deck.dealCard());
    this.player.updateScore();
  }

  dealerTurn() {
    //STUB
  }

  displayWelcomeMessage() {
    console.log('Welcome to 21!');
  }

  displayGoodbyeMessage() {
    console.log('Thank you for playing 21!');
  }

  displayPlayerHand() {
    console.log('Your current hand: ');
    console.log('===================');

    let arr = this.player.hand;
    arr.forEach((obj) => {
      console.log(`${obj.getCard()}`);
    });

    console.log('');
    console.log(`Current score: ${this.player.getScore()}`);

    // console.log(`${this.player.hand[0].getCard()}`);
    // console.log(`${this.player.hand[1].getCard()}`);
  }

  displayResult() {
    //STUB
  }
}

let game = new TwentyOneGame();
game.start();
