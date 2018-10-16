const Node = function (data) {
  this.data = data;
  this.next = null;
  this.prev = null;
};

const DoublyLinkedCircularList = function () {
  this.head = null;
  this.last = null;
  this.length = 0;

  this.append = function (data) {
    const newNode = new Node(data);
    this.length++;
    if (!this.head) {
      newNode.next = newNode;
      newNode.prev = newNode;
      this.head = newNode;
      this.last = newNode;
    } else {
      newNode.prev = this.last;
      newNode.next = this.head;
      this.last.next = newNode;
      this.last = newNode;
      this.head.prev = this.last;
    }
    return this;
  };

  this.prepend = function (data) {
    if (this.length === 0) {
      return this.append(data);
    }
    this.length++;
    const newNode = new Node(data);
    newNode.next = this.head;
    newNode.prev = this.last;
    this.head.prev = newNode;
    this.head = newNode;
    this.last.next = newNode;
    return this;
  };

  this.insert = function (data, index) {
    if (index >= this.length - 1) {
      return this.append(data);
    }
    const newNode = new Node(data);
    this.length++;
    let currentVal = this.head.next;
    for (let i = 0; i < index; i++) {
      currentVal = currentVal.next;
    }
    newNode.next = currentVal;
    newNode.prev = currentVal.prev;
    currentVal.prev.next = newNode;
    currentVal.prev = newNode;
    return this;
  };

  this.forEach = function (fn) {
    let currentVal = this.head;
    for (let i = 0; i < this.length; i++) {
      fn(currentVal.data);
      currentVal = currentVal.next;
    }
  };

  this.print = function () {
    this.forEach(console.log);
  };

  this.peek = function (index) {
    if (index >= this.length) return null;
    if (index === 0) {
      return this.head.data;
    }
    if (index <= this.length / 2) {
      let currentVal = this.head;
      for (let i = 0; i < index; i++) {
        currentVal = currentVal.next;
      }
      return currentVal.data;
    } else {
      let currentVal = this.head;
      for (let i = 0; i < this.length - index; i++) {
        currentVal = currentVal.prev;
      }
      return currentVal.data;
    }
  };

  this.popAtIndex = function (index) {
    if (index >= this.length) return null;
    if (index === 0) {
      this.length--;
      const data = this.head.data;
      if (this.length === 0) {
        this.head = null;
      } else {
        this.head.prev.next = this.head.next;
        this.head.next.prev = this.head.prev;
        this.head = this.head.next;
      }
      return data;
    }
    this.length--;
    if (index <= this.length / 2) {
      let currentVal = this.head;
      for (let i = 0; i < index; i++) {
        currentVal = currentVal.next;
      }
      const data = currentVal.data;
      currentVal.prev.next = currentVal.next;
      currentVal.next.prev = currentVal.prev;
      return data;
    } else {
      let currentVal = this.head;
      for (let i = 0; i < this.length + 1 - index; i++) {
        currentVal = currentVal.prev;
      }
      const data = currentVal.data;
      currentVal.prev.next = currentVal.next;
      currentVal.next.prev = currentVal.prev;
      return data;
    }
  };
};

module.exports = { DoublyLinkedCircularList };
