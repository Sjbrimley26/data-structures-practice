const AStack = function () {
  this.items = [];

  this.push = function (data) {
    this.items.push(data);
  };

  this.pop = function () {
    return this.items.pop();
  };

  this.length = function () {
    return this.items.length;
  };

  this.isEmpty = function () {
    return this.items.length === 0;
  };
};

module.exports = { AStack };
