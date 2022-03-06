// Animals
// Create two classes Cat and Dog that inherit from Animal

class Animal {
  constructor(name, age, legs, species, status) {
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
  }
  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
  }
}

class Cat extends Animal {
  constructor(name, age, status) {
    super(name, age, 4, 'cat', status);
  }

  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}. Meow meow!`;
  }
}

class Dog extends Animal {
  constructor(name, age, status, master) {
    super(name, age, 4, 'dog', status);
    this.master = master;
  }

  greetMaster() {
    return `Hello ${this.master}! Woof, woof!`;
  }
}

let cat = new Cat('Pepe', 2, 'happy');
console.log(
  cat.introduce() ===
    'Hello, my name is Pepe and I am 2 years old and happy. Meow meow!'
); // logs true

let dog = new Dog('Sam', 5, 'hyper', 'Matt');
console.log(dog.greetMaster());