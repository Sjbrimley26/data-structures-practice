const { LinkedList } = require("./LinkedList");

const Stack = function() {
    this.items = new LinkedList();
};

Stack.prototype.push = function(data) {
    this.items.prepend(data);
    return this;
};

Stack.prototype.pop = function() {
    return this.items.popAtIndex(0);
};

Stack.prototype.print = function() {
    this.items.print();
};

const stack = new Stack();
stack.push("pie").push("pot").push("chicken");
stack.print();