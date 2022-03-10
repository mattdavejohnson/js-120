// Ancestors
// Implement an ancestors method that returns the prototype chain (ancestors)
// of a calling object as an array of object names.

// name property added to make objects easier to identify
let foo = {
  name: 'foo',

  ancestors: function () {
    let results = [];
    let ancestor = Object.getPrototypeOf(this);

    while (ancestor.hasOwnProperty('name')) {
      results.push(ancestor.name);
      ancestor = Object.getPrototypeOf(ancestor);
    }

    results.push('Object.prototype');

    return results;
  },
};

let bar = Object.create(foo);
bar.name = 'bar';

let baz = Object.create(bar);
baz.name = 'baz';

let qux = Object.create(baz);
qux.name = 'qux';

console.log(qux.ancestors()); // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors()); // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors()); // returns ['foo', 'Object.prototype']
console.log(foo.ancestors()); // returns ['Object.prototype']
