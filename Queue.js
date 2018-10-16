const Node = function (data) {
  this.data = data;
  this.next = null;
};

const Queue = function () {
  this.front = null;
  this.rear = null;
  this.length = 0;

  this.push = function (data) {
    if (!data) return this;
    this.length++;
    if (this.front == null) {
      this.front = new Node(data);
      this.rear = this.front;
    } else {
      this.rear.next = new Node(data);
      this.rear = this.rear.next;
    }
    return this;
  };

  this.pop = function () {
    if (this.front == null) {
      return null;
    } else {
      this.length--;
      const returnedValue = this.front.data;
      if (this.front.next) {
        this.front = this.front.next;
      } else {
        this.front = null;
      }
      return returnedValue;
    }
  };

  this.isEmpty = function () {
    return this.front == null;
  };
};

module.exports = { Queue };
