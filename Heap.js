const samplePoints = [];
for (let i = 95; i >= 0; i -= 5) {
  samplePoints.push(i);
}

const MinHeap = function() {
  this.heap = [];

  this.insert = function(val) {
    if (typeof val !== 'number') {
      return new Error("Only insert numbers");
    }
    if (this.heap.length === 0) {
      this.heap.push(val);
      return this;
    }
    this.heap.push(val);
    let i = this.heap.length - 1;
    while(i != 0 && this.heap[getParent(i)] > this.heap[i]) {
      this.swap(i, getParent(i));
      i = getParent(i);
    }
  };

  this.swap = function(index1, index2) {
    const originalVal = this.heap[index2];
    this.heap[index2] = this.heap[index1];
    this.heap[index1] = originalVal;
  };

};

const getParent = index => {
  return Math.floor((index - 1) / 2);
};

const getLeftChild = index => {
  return index * 2 + 1;
};

const getRightChild = index => {
  return index * 2 + 2;
};

module.exports = {
  MinHeap
};