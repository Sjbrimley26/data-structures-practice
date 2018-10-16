const Node = function(data) {
  this.data = data;
  this.next = null;
};

const SortedList = function() {
  this.head = null;
  this.tail = null;
  this.length = 0;
};

SortedList.prototype.push = function(data) {
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
    let nextNode = currentNode.next;
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
    fn(currentVal.data);
    currentVal = currentVal.next;
  }
};

SortedList.prototype.print = function () {
  this.forEach(console.log);
};

SortedList.prototype.toArray = function () {
  const arr = [];
  this.forEach(arr.push.bind(arr));
  return arr;
};

SortedList.prototype.shift = function () {
  if (!this.head) return undefined;
  this.length--;
  const oldHead = this.head.data;
  this.head = this.head.next;
  return oldHead;
};

SortedList.prototype.pop = function () {
  const oldTail = this.tail.data;
  let newTail = this.head;
  for (let i = 0; i < this.length - 2; i++) {
    newTail = newTail.next;
  }
  newTail.next = null;
  this.tail = newTail;
  return oldTail;
};

const list = new SortedList();

const getRandom = () => Math.random() * 10 >> 0;
const sampleArray = [];
for (let i = 0; i < 10; i++) {
  sampleArray.push(getRandom());
}
console.log(sampleArray);
sampleArray.forEach(i => {
  list.push(i);
});

console.log("Length", list.length);
console.log(list.toArray());

// Sometimes not all of the items are added into the list.
// especially if a 0 is entered after some other numbers
