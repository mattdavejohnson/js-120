// Write a constructor function that you can use with or without the `new`
// operator. The function should return the same result with either form.

function User(first, last) {
  if (!(this instanceof User)) {
    return new User(first, last);
  }

  this.name = first + ' ' + last;
}

let myName = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(myName); // => Jane Doe
console.log(user1.name); // => John Doe
console.log(user2.name); // => John Doe
