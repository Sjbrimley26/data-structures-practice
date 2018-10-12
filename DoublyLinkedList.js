const Node = function(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
};

const DoublyLinkedList = function() {
    this.head = null;
    this.last = null;
    this.length = 0;

    this.append = function(data) {
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
            this.last = newNode;
            this.head.prev = this.last;
        }
        return this;
    };

    this.prepend = function(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        newNode.prev = this.last;
        this.head = newNode;
        return this;
    };

    this.insertAt = function(data, index) {
        if (index >= this.length - 1) {
            return this.append(data);
        }
        if (index == 0) {
           return this.prepend(data); 
        }
        const newNode = new Node(data);
        this.length++;
        let currentVal = this.head.next;
        for (let i = 0; i < index - 1; i++) {
            currentVal = currentVal.next;
        }
        newNode.next = currentVal;
        newNode.prev = currentVal.prev;
        currentVal.prev.next = newNode;
        currentVal.prev = newNode;
        return this;
    };

    this.forEach = function(fn) {
        let currentVal = this.head;
        for (let i = 0; i < this.length - 1; i++) {
            fn(currentVal.data);
            currentVal = currentVal.next;
        }
    };

    this.print = function() {
        this.forEach(console.log);
    };

};

const list = new DoublyLinkedList();
list
    .append(0)
    .append(1)
    .append(2)
    .prepend(6)
    .insertAt(3, 1);

list.print();