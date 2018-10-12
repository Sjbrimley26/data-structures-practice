const { MinHeap } = require("./Heap");

const nodeProto = {
  data: null,
  next: null
};

const Node = function(data) {
  return Object.assign(
    Object.create(nodeProto),
    {
      data
    }
  );
};

const LinkedList = function() {
  this.head = null;
  this.tail = null;
  this.length = 0;

  this.prepend = function(data) {
    this.length++;
    const newNode = Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    return this;
  };

  this.append = function(data) {
    this.length++;
    const newNode = Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    return this;
  };

  this.insert = function(data, index) {
    if (index == 0) {
      return this.prepend(data);
    }
    if (index >= this.length) {
      return this.append(data);
    }
    
    let currentVal = this.head;
    for (let i = 0; i < index - 1; i++) {
      currentVal = currentVal.next;
    }
    this.length++;
    const newNode = Node(data);
    newNode.next = currentVal.next;
    currentVal.next = newNode;

    return this;
  };

  this.get = function(index) {
    if (index == 0) {
      return this.head.data;
    }
    if (index == this.length - 1) {
      return this.tail.data;
    }
    if (index >= this.length) {
      return new Error("Out of range");
    }
    let currentVal = this.head;
    for (let i = 0; i < index; i++) {
      currentVal = currentVal.next;
    }
    return currentVal.data;
  };

  this.delete = function(index) {
    if (index >= this.length) {
      return new Error("Out of range");
    }
    if (index == 0) {
      this.length--;
      const oldHead = this.head.data;
      this.head = this.head.next;
      return oldHead;
    }
    this.length--;
    let currentVal = this.head;
    for (let i = 0; i < index - 1; i++) {
      currentVal = currentVal.next;
    }
    const deletedValue = currentVal.next.data;
    currentVal.next = currentVal.next.next;
    if (!currentVal.next) {
      this.tail = currentVal;
    }
    return deletedValue;
  };

  this.print = function() {
    this.forEach(console.log);
  };

  this.forEach = function(fn) {
    let currentVal = this.head;
    while (currentVal) {
      fn(currentVal.data);
      currentVal = currentVal.next;
    }
  };

};

module.exports = { LinkedList };