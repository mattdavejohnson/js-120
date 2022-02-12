/*
Modify the program from the previous problem so that logReturnVal accepts
an additional context argument.
*/

let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return (
      this.firstName + ' ' + this.lastName + ' is a ' + this.occupation + '.'
    );
  },
};

function logReturnVal(func, context) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal(turk.getDescription, turk);
