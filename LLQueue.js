const { LinkedList } = require("./LinkedList");

const LLQueue = function() {
    this.items = new LinkedList();
    
    this.push = function(data) {
        this.items.append(data);
        return this;
    };

    this.pop = function() {
        return this.items.popAtIndex(0);
    };

    this.isEmpty = function() {
        return this.items.length === 0;
    };

    this.print = function() {
        this.items.print();
    };

};

const queue = new LLQueue();
queue.push("chicken").push("pot").push("pie");
queue.print();