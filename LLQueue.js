const { LinkedList } = require("./LinkedList");

const LLQueue = function () {
  this.items = new LinkedList();

  this.push = function (data) {
    this.items.append(data);
    return this;
  };

  this.pop = function () {
    return this.items.popAtIndex(0);
  };

  this.peek = function () {
    return this.items.peekAtIndex(0);
  };

  this.isEmpty = function () {
    return this.items.length === 0;
  };

  this.print = function () {
    this.items.print();
  };
};

module.exports = { LLQueue };
