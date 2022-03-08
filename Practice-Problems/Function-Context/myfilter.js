// myFilter
// We are updateding an implementation of myFilter by adding the functionality
// of accepting an optional thisArg just like the original filter.

function myFilter(array, func, optionalThis) {
  let result = [];

  array.forEach(function (value) {
    if (func.call(optionalThis, value)) {
      result.push(value);
    }
  });

  return result;
}

let filter = {
  allowedValues: [5, 6, 9],
};

myFilter(
  [2, 1, 3, 4, 5, 6, 9, 12],
  function (val) {
    return this.allowedValues.indexOf(val) >= 0;
  },
  filter
); // returns [5, 6, 9]
