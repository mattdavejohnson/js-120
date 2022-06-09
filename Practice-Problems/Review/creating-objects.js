// let myArr = [null, null, null];

// function sortArray(arr) {
//   let swaps = 0;

//   do {
//     swaps = 0;
//     for (let index = 0; index < arr.length - 1; index += 1) {
//       if (arr[index] === null && arr[index + 1] !== null) {
//         arr[index] = arr[index + 1];
//         arr[index + 1] = null;
//         swaps += 1;
//       }
//     }
//   } while (swaps > 0);
// }

// function empty(arr) {
//   return arr.every((el) => el === null);
// }

// function full(arr) {
//   return arr.every((el) => el !== null);
// }

// function enqueue(arr, element) {
//   if (empty(arr)) {
//     arr[0] = element;
//     return;
//   }

//   if (full(arr)) {
//     arr.shift();
//     arr.push(element);
//     return;
//   }

//   sortArray(arr);
//   let firstNull = arr.findIndex((el) => el === null);
//   arr[firstNull] = element;
// }

// function dequeue(arr) {
//   if (empty(arr)) {
//     return null;
//   }

//   sortArray(arr);
//   let oldest = arr.shift();
//   arr.push(null);
//   return oldest;
// }

class CircularQueue {
  constructor(length) {
    this.list = Array(length).fill(null);
  }

  empty() {
    return this.list.every((el) => el === null);
  }

  full() {
    return this.list.every((el) => el !== null);
  }

  sortList() {
    let swaps = 0;

    do {
      swaps = 0;
      for (let index = 0; index < this.list.length - 1; index += 1) {
        if (this.list[index] === null && this.list[index + 1] !== null) {
          this.list[index] = this.list[index + 1];
          this.list[index + 1] = null;
          swaps += 1;
        }
      }
    } while (swaps > 0);
  }

  enqueue(element) {
    if (this.empty()) {
      this.list[0] = element;
      return;
    }

    if (this.full()) {
      this.list.shift();
      this.list.push(element);
      return;
    }

    this.sortList();
    let firstNull = this.list.findIndex((el) => el === null);
    this.list[firstNull] = element;
  }

  dequeue() {
    if (this.empty()) {
      return null;
    }

    this.sortList();
    let oldest = this.list.shift();
    this.list.push(null);
    return oldest;
  }
}

let queue = new CircularQueue(3);
console.log(queue.dequeue() === null);

queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue() === 1);

queue.enqueue(3);
queue.enqueue(4);
console.log(queue.dequeue() === 2);

queue.enqueue(5);
queue.enqueue(6);
queue.enqueue(7);
console.log(queue.dequeue() === 5);
console.log(queue.dequeue() === 6);
console.log(queue.dequeue() === 7);
console.log(queue.dequeue() === null);

let anotherQueue = new CircularQueue(4);
console.log(anotherQueue.dequeue() === null);

anotherQueue.enqueue(1);
anotherQueue.enqueue(2);
console.log(anotherQueue.dequeue() === 1);

anotherQueue.enqueue(3);
anotherQueue.enqueue(4);
console.log(anotherQueue.dequeue() === 2);

anotherQueue.enqueue(5);
anotherQueue.enqueue(6);
anotherQueue.enqueue(7);
console.log(anotherQueue.dequeue() === 4);
console.log(anotherQueue.dequeue() === 5);
console.log(anotherQueue.dequeue() === 6);
console.log(anotherQueue.dequeue() === 7);
console.log(anotherQueue.dequeue() === null);
