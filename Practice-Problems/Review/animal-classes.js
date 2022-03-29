// Create an Animal class that is the super class of a Dog and Cat sub class
// using ES6 classes

class Animal {
  constructor(name, gender, age) {
    this.name = name;
    this.gender = gender;
    this.age = age;
  }

  sayName() {
    console.log(`My name is ${this.name}!`);
  }
}

class Dog extends Animal {
  constructor(name, gender, age, breed) {
    super(name, gender, age);
    this.breed = breed;
  }

  introduce() {
    console.log(`My name is ${this.name} and I am a ${this.breed} dog!`);
  }
}

class Cat extends Animal {
  constructor(name, gender, age, weight) {
    super(name, gender, age);
    this.weight = weight;
  }

  howHeavy() {
    console.log(`${this.name} weighs ${this.weight} pounds.`);
  }
}

let doggie = new Dog('Sam', 'female', 8, 'Lab');
let kitty = new Cat('Momma', 'female', 10, 30);

doggie.introduce();
doggie.sayName();
kitty.howHeavy();
kitty.sayName();
