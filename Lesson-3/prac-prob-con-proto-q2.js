// Question 2: How would you fix the problem in the code from problem 1?

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = this.area();
  this.perimeter = this.perimeter();
}

Rectangle.prototype.area = function () {
  return this.width * this.height;
};

Rectangle.prototype.perimeter = function () {
  return 2 * (this.width + this.height);
};

let rect1 = new Rectangle(2, 3);

console.log(rect1.area);
console.log(rect1.perimeter);
