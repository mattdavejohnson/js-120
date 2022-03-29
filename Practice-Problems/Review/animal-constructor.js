// Create an Animal class that is the super class of a Dog and Cat sub class
// using constructors and prototypes

function Animal(name, gender, age) {
  this.name = name;
  this.gender = gender;
  this.age = age;
}

Animal.prototype.sayName = function () {
  console.log(`My name is ${this.name}`);
};

function Dog(name, gender, age, breed) {
  Animal.call(this, name, gender, age);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.introduce = function () {
  console.log(`My name is ${this.name} and I am a ${this.breed} dog!`);
};

function Cat(name, gender, age, weight) {
  Animal.call(this, name, gender, age);
  this.weight = weight;
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.howHeavy = function () {
  console.log(`${this.name} weighs ${this.weight} pounds.`);
};

let doggie = new Dog('Sam', 'female', 8, 'Lab');
let kitty = new Cat('Momma', 'female', 10, 30);

doggie.introduce();
doggie.sayName();
kitty.howHeavy();
kitty.sayName();
