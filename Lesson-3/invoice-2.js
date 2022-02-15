/* eslint-disable max-lines-per-function */
/*
Build a factory function to create payments.

Explicit Requirements:
- The function can take an object argument in one of 3 forms:
  - Payment for one service: { internet: 1000 } or { phone: 1000 }
  - Payment for both services: { internet: 2000, phone: 1000 }
  - Payment with just an amount property: { amount: 2000 }
- The function should return an object that has the amount paid for each
  service and a 'total' method that returns the payment total.
- If the 'amount' property is not present in the argument, it should
  return the sum of the phone and internet service charges.
- If the 'amount' property is present, return the value of that property.

*/

function createPayment(services = {}) {
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,

    total: function () {
      if (this.amount) {
        return this.amount;
      } else {
        return this.phone + this.internet;
      }
    },
  };
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment) => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(
  createPayment({
    internet: 6500,
  })
);

payments.push(
  createPayment({
    phone: 2000,
  })
);

payments.push(
  createPayment({
    phone: 1000,
    internet: 4500,
  })
);

payments.push(
  createPayment({
    amount: 10000,
  })
);

console.log(paymentTotal(payments)); // => 24000
