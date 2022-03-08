// Testing Object Equality
// Write a function that accepts two object arguments and returns true or
// false depending on whether the objects have the same key/value pairs

// function objectsEqual(obj1, obj2) {
//   let obj1Keys = Object.keys(obj1).sort();
//   let obj2Keys = Object.keys(obj2).sort();

//   if (obj1Keys.length !== obj2Keys.length) {
//     return false;
//   }

//   for (let index = 0; index < obj1Keys.length; index += 1) {
//     if (obj1[obj1Keys[index]] !== obj2[obj2Keys[index]]) {
//       return false;
//     }
//   }

//   return true;
// }

function objectsEqual(obj1, obj2) {
  return hasSameKeys(obj1, obj2) && hasSameValues(obj1, obj2);
}

function hasSameKeys(obj1, obj2) {
  let obj1Keys = Object.getOwnPropertyNames(obj1).sort();
  let obj2Keys = Object.getOwnPropertyNames(obj2).sort();

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  return obj1Keys.every((value, index) => {
    return value === obj2Keys[index];
  });
}

function hasSameValues(obj1, obj2) {
  let obj1Keys = Object.getOwnPropertyNames(obj1).sort();

  return obj1Keys.every((value) => {
    return obj1[value] === obj2[value];
  });
}

console.log(objectsEqual({ a: 'foo' }, { a: 'foo' })); // true
console.log(objectsEqual({ a: 'foo', b: 'bar' }, { a: 'foo' })); // false
console.log(objectsEqual({}, {})); // true
console.log(objectsEqual({ a: 'foo', b: undefined }, { a: 'foo', cc: 1 })); // false
