const samplePoints = [];
for (let i = 0; i < 100; i += 5) {
  samplePoints.push(i);
}

const Node = function(data) {
  this.data = data;
  this.right = null;
  this.left = null;
};

Node.prototype.addChild = function(data) {
  if (this.data > data) {
    if (this.left) {
      this.left.addChild(data);
    } else {
      this.left = new Node(data);
    }
  } else {
    if (this.right) {
      this.right.addChild(data);
    } else {
      this.right = new Node(data);
    }
  }
};

Node.prototype.contains = function(data) {
  if (this.data == data) {
    return true;
  }
  if (this.data > data) {
    if (this.left) {
      return this.left.contains(data);
    } else {
      return false;
    }
  } else {
    if (this.right) {
      return this.right.contains(data);
    } else {
      return false;
    }
  }
};

Node.prototype.inOrder = function() {
  this.left && this.left.inOrder();
  console.log(this.data);
  this.right && this.right.inOrder();
};

Node.prototype.getSmallestNode = function() {
  if (this.left) {
    return this.left.getSmallestNode();
  } else {
    return this;
  }
};

Node.prototype.removeChild = function(data) {
  if (this.contains(data) == false) {
    return false;
  } else {
     if (this.data > data) {
      if (this.left.data == data) {
        if (this.left.left) {
          this.left.data = this.left.left.data;
          this.left.left = this.left.left.left;
        } else if (this.left.right) {
          this.left.data = this.left.right.data;
          this.left.right = this.left.right.right;
        } else {
          this.left = null;
        }
      } else {
        this.left.removeChild(data);
      }
    } else if (this.data < data) {
      if (this.right.data == data) {
        if (this.right.left) {
          this.right.data = this.right.left.data;
          this.right.left = this.right.left.left;
        } else if (this.right.right) {
          this.right.data = this.right.right.data;
          this.right.right = this.right.right.right;
        } else {
          this.right = null;
        }
      } else {
        this.right.removeChild(data);
      }
    } else {
      const smallest = this.right.getSmallestNode();
      this.data = smallest.data;
      this.right.removeChild(smallest.data);
    }
    return true;
  }
};

const Tree = function() {
  this.root = null;
  this.length = 0;

  this.insert = function(data) {
    this.length += 1;
    if (this.root) {
      if (this.root.data > data) {
        if (this.root.left) {
          this.root.left.addChild(data);
        } else {
          this.root.left = new Node(data);
        }
      } else {
        if (this.root.right) {
          this.root.right.addChild(data);
        } else {
          this.root.right = new Node(data);
        }
      }
    } else {
      this.root = new Node(data);
    }
  };

  this.contains = function(data) {
    return this.root.contains(data);
  };

  this.inOrder = function() {
    if (!this.root) {
      return null;
    }
    this.root.inOrder();
  };

  this.removeNode = function(data) {
    if (this.root.removeChild(data)) {
      this.length--;
    }
  }

};

const convertSortedArrayToBST = (arr, tree = new Tree()) => {
  if (arr.length === 1) {
    tree.insert(arr[0]);
    return;
  } else if (arr.length === 0) {
    return;
  }
  const mid = Math.floor(arr.length / 2);
  tree.insert(arr[mid]);
  const leftArray = arr.slice(0, mid);
  const rightArray = arr.slice(mid + 1);
  convertSortedArrayToBST(leftArray, tree);
  convertSortedArrayToBST(rightArray, tree);
  return tree;
};

const tree = convertSortedArrayToBST(samplePoints);

tree.removeNode(50);
console.log("Tree Nodes", tree.length);
tree.inOrder();