/*
Create a factory function used to create invoices

Explicit Requirements:
- It returns an invoice object, with 'phone' and 'internet' properties, and
  a 'total' method.
- The default value for the phone service is 3000, and the internet service
  is 5500 (in cents).
- The function takes an object argument whose attribuites override the default
  values.

let invoice = {
  phone: 3000,
  internet: 6500,
};

let payment = {
  phone: 1300,
  internet: 5500,
};

let invoiceTotal = invoice.phone + invoice.internet;
let paymentTotal = payment.phone + payment.internet;
let remainingDue = invoiceTotal - paymentTotal;

console.log(paymentTotal); // => 6800
console.log(remainingDue); // => 2700

*/

function createInvoice(services) {
  let phone = 3000;
  let internet = 5500;

  if (services) {
    if (services.phone) {
      phone = services.phone;
    }

    if (services.internet) {
      internet = services.internet;
    }
  }

  return {
    phone: phone,
    internet: internet,

    total: function () {
      return this.phone + this.internet;
    },
  };
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(
  createInvoice({
    phone: 1000,
    internet: 4500,
  })
);

console.log(invoiceTotal(invoices)); // 31000
