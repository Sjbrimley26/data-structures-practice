const { LLQueue } = require("./LLQueue");

const validOptionCheck = option => {
  if (!["min", "max"].includes(option)) {
    throw new Error("Option must be min or max!");
  }
};

const insert = function (option) {
  validOptionCheck(option);
  return function (val) {
    if (typeof val !== "number") {
      throw new Error("Only insert numbers into heap!");
    }
    if (this.heap.length === 0) {
      this.heap.push(val);
      return this;
    }
    this.heap.push(val);
    let i = this.heap.length - 1;
    if (option === "min") {
      while (i !== 0 && this.heap[getParent(i)] > this.heap[i]) {
        this.swap(i, getParent(i));
        i = getParent(i);
      }
    } else {
      while (i !== 0 && this.heap[getParent(i)] < this.heap[i]) {
        this.swap(i, getParent(i));
        i = getParent(i);
      }
    }
  }
};

const swap = function (index1, index2) {
  const originalVal = this.heap[index2];
  this.heap[index2] = this.heap[index1];
  this.heap[index1] = originalVal;
};

const getRoot = function () {
  return this.heap[0];
};

const extractRoot = function () {
  if (this.heap.length === 0) return undefined;
  if (this.heap.length === 1) {
    return this.heap.shift();
  }
  const extractedValue = this.heap[0];
  this.heap[0] = this.heap[this.heap.length - 1];
  this.heap.pop();
  this.heapify(0);
  return extractedValue;
};

const heapify = function(option) {
  validOptionCheck(option);
  return function (i) {
    let left = getLeftChild(i);
    let right = getRightChild(i);
    let root = i;
    if (option === "min") {
      if (left < this.heap.length && this.heap[left] < this.heap[root]) {
        root = left;
      }
      if (right < this.heap.length && this.heap[right] < this.heap[root]) {
        root = right;
      }
    } else {
      if (left < this.heap.length && this.heap[left] > this.heap[root]) {
        root = left;
      }
      if (right < this.heap.length && this.heap[right] > this.heap[root]) {
        root = right;
      }
    }
    if (root !== i) {
      this.swap(i, root);
      this.heapify(root);
    }
  };
};

const contains = function (val) {
  return this.heap.includes(val);
};

const inOrder = function (fn, i = 0) {
  const node = i;
  const left = getLeftChild(node);
  const right = getRightChild(node);
  left < this.heap.length && this.inOrder(fn, left);
  fn(this.heap[i]);
  right < this.heap.length && this.inOrder(fn, right);
};

// So it turns out that the heap is in breadth-first order all
// the time so there's  no need for the queues and whatnot.
const breadthFirst = function (fn) {
  this.heap.forEach(item => fn(item));
};

const indexOf = function (val, {
    depthFirst = false
  } = {}) {
    if (depthFirst) {
      let found = -1;
      let searchCount = 0;
      const search = index => {
        if (found >= 0) {
          return;
        }
        searchCount++;
        const left = getLeftChild(index);
        const right = getRightChild(index);
        left < this.heap.length && search(left);
        if (this.heap[index] === val) {
          found = index;
          return;
        }
        right < this.heap.length && search(right);
      };
      search(0);
      console.log("DFS Operations", searchCount);
      return found;
    }

    // Breadth-first ftw
    console.log("BFS Operations", this.heap.indexOf(val));
    return this.heap.indexOf(val);
};

const changeHeapType = function (option) {
  validOptionCheck(option);
  return function () {
    const heap = option === "min" ? new MaxHeap() : new MinHeap();
    this.heap.forEach(val => heap.insert(val));
    return heap;
  };
};

const getParent = index => Math.floor((index - 1) / 2);
const getLeftChild = index => index * 2 + 1;
const getRightChild = index => index * 2 + 2;

const MinHeap = function () {
  this.heap = [];
};

MinHeap.prototype.swap = swap;
MinHeap.prototype.insert = insert("min");
MinHeap.prototype.getMin = getRoot;
MinHeap.prototype.extractMin = extractRoot;
MinHeap.prototype.heapify = heapify("min");
MinHeap.prototype.contains = contains;
MinHeap.prototype.inOrder = inOrder;
MinHeap.prototype.breadthFirst = breadthFirst;
MinHeap.prototype.indexOf = indexOf;
MinHeap.prototype.toMaxHeap = changeHeapType("min");

const MaxHeap = function() {
  this.heap = [];
};

MaxHeap.prototype.swap = swap;
MaxHeap.prototype.insert = insert("max");
MaxHeap.prototype.getMax = getRoot;
MaxHeap.prototype.extractMax = extractRoot;
MaxHeap.prototype.heapify = heapify("max");
MaxHeap.prototype.contains = contains;
MaxHeap.prototype.inOrder = inOrder;
MaxHeap.prototype.breadthFirst = breadthFirst;
MaxHeap.prototype.indexOf = indexOf;
MaxHeap.prototype.toMinHeap = changeHeapType("max");

module.exports = {
  MinHeap,
  MaxHeap
};
