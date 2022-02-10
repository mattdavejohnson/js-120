/*
Write a function that searches the prototype chain of an object for a given
property and assigns it a new value. If the property does not exist in any of
the prototype objects, the function should do nothing.
*/

function assignProperty(obj, prop, newValue) {
  while (obj !== null) {
    if (obj.hasOwnProperty(prop)) {
      obj[prop] = newValue;
      break;
    }

    obj = Object.getPrototypeOf(obj);
  }
}

let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, 'bar', 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, 'qux', 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty('qux')); // false
console.log(fooC.hasOwnProperty('qux')); // false
