const { MinHeap, MaxHeap } = require("./Heap");

const Node = function (data) {
  this.data = data;
  this.next = null;
};

const SortedList = function () {
  this.head = null;
  this.tail = null;
  this.length = 0;
};

SortedList.prototype.push = function (data) {
  this.length++;
  const newNode = new Node(data);

  if (!this.head) {
    this.head = newNode;
    this.tail = newNode;
    return this;
  }

  if (this.tail && this.tail.data <= newNode.data) {
    // console.log("Append");
    this.tail.next = newNode;
    this.tail = newNode;
    return this;
  }

  let currentNode = this.head;

  if (currentNode.data >= newNode.data) {
    // console.log("Prepend");
    newNode.next = currentNode;
    this.head = newNode;
    return this;
  }

  while (currentNode.data <= newNode.data) {
    const nextNode = currentNode.next;
    if (nextNode.data >= newNode.data) {
      // console.log("Insert");
      newNode.next = nextNode;
      currentNode.next = newNode;
      return this;
    }
    currentNode = currentNode.next;
  }
};

SortedList.prototype.forEach = function (fn) {
  let currentVal = this.head;
  while (currentVal) {
    fn(currentVal);
    currentVal = currentVal.next;
  }
};

SortedList.prototype.print = function () {
  this.forEach(console.log);
};

SortedList.prototype.toArray = function () {
  const arr = [];
  this.forEach(arr.push.bind(arr));
  return arr.map(item => item.data);
};

SortedList.prototype.shift = function () {
  if (!this.head) return undefined;
  this.length--;
  const oldHead = this.head.data;
  this.head = this.head.next;
  if (this.length === 0) {
    this.tail = null;
  }
  return oldHead;
};

SortedList.prototype.pop = function () {
  if (!this.head) return undefined;
  this.length--;
  if (this.length === 0) {
    const oldTail = this.head.data;
    this.head = null;
    this.tail = null;
    return oldTail;
  }
  const oldTail = this.tail.data;
  let newTail = this.head;
  for (let i = 0; i < this.length - 1; i++) {
    newTail = newTail.next;
  }
  newTail.next = null;
  this.tail = newTail;
  return oldTail;
};

SortedList.prototype.reverse = function () {
  if (!this.head) return undefined;
  let prev = null;
  let next = null;
  let current = this.head;
  while (current) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  const oldTail = this.tail;
  this.tail = this.head;
  this.head = oldTail;
  return this;
};

const list = new SortedList();
const minHeap = new MinHeap();
const maxHeap = new MaxHeap();

const getRandom = (min, max) => (Math.random() * (max - min) >> 0) + min;

const sampleArray = [];
for (let i = 0; i < 10; i++) {
  sampleArray.push(getRandom(0, 10));
}
console.log(sampleArray);
sampleArray.forEach(i => {
  list.push(i);
  minHeap.insert(i);
  maxHeap.insert(i);
});

const log = () => console.log(list.toArray());

console.log("Length", list.length);
log();
console.log("Min Heap", minHeap.heap);
console.log("Max Heap", maxHeap.heap);
while (maxHeap.heap.length) {
  console.log(maxHeap.extractMax());
}
console.log("Max Heap", maxHeap.heap);
