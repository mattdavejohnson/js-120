/*
Question 2: Create a class named `Greeting` with a single method named
`greet` that takes a string argument and prints the argument to the
console. Create two more classes that inherit from `Greeting`. Have each
use the `greet` method.
*/

class Greeting {
  greet(text) {
    console.log(text);
  }
}

class Hello extends Greeting {
  hi() {
    this.greet('Hello');
  }
}

class Goodbye extends Greeting {
  bye() {
    this.greet('Goodbye');
  }
}

let hello = new Hello();
hello.hi();

let goodbye = new Goodbye();
goodbye.bye();
