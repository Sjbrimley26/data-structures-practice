const { Queue } = require("./Queue");

const BLACK = "BLACK";
const RED = "RED";
const LEFT = "left";
const RIGHT = "right";

/**
 * @typedef {('RED'|'BLACK')} Color
 */

/**
 * Leaf represents a single number with 2 potential "branches",
 * the left containing values less than the one contained in the
 * Leaf and the right containing equal or greater values.
 * @param {number} value any number.
 * @param {Color} color either red or black.
 */
function Leaf (value, color = RED) {
  this.value = value;
  this.color = color;
  this.left = null;
  this.right = null;
  this.parent = null;
}

/**
 * Tree represents a self-balancing red-black BST.
 * @param {Leaf?} rootNode a Leaf to be used as the root of the tree.
 */
function Tree (rootNode) {
  this.root = rootNode;
}

/**
 * Inserts a value into the node tree. Works recursively,
 * so it will go down the tree until it finds an empty space.
 * @name Tree#append
 * @param {number} v any number.
 */
Tree.prototype.append = function (v) {
  const root = this.root;
  const node = new Leaf(v);
  if (!root) {
    node.color = BLACK;
    this.root = node;
    return;
  }
  const isLeft = v < root.value;
  const branch = isLeft ? LEFT : RIGHT;
  /** @type {Leaf?} */
  const parent = root[branch];
  /** @type {Leaf?} */
  const uncle = isLeft ? root[RIGHT] : root[LEFT];
  if (parent != null) {
    const inserted = parent.append(node, root, uncle);
    this.fixViolation(inserted);
  } else {
    node.parent = root;
    root[branch] = node;
  }
};

/**
 * @name Tree#rotateLeft
 * @param {Leaf} node
 */
Tree.prototype.rotateLeft = function (node) {
  const { right } = node;
  node.right = right.left;
  if (node.right !== null) {
    node.right.parent = node;
  }
  right.parent = node.parent;
  if (node.parent === null) {
    this.root = right;
  } else if (node === node.parent.left) {
    node.parent.left = right;
  } else {
    node.parent.right = right;
  }
  right.left = node;
  node.parent = right;
};

/**
 * @name Tree#rotateRight
 * @param {Leaf} node
 */
Tree.prototype.rotateRight = function (node) {
  const { left } = node;
  node.left = left.right;
  if (node.left !== null) {
    node.left.parent = node;
  }
  left.parent = node.parent;
  if (node.parent === null) {
    this.root = left;
  } else if (node === node.parent.left) {
    node.parent.left = left;
  } else {
    node.parent.right = left;
  }
  left.right = node;
  node.parent = left;
};

Tree.prototype.fixViolation = function (node) {
  let n = node;
  let parent = null;
  let grandparent = null;
  while (
    n !== this.root &&
    n.color !== BLACK &&
    n.parent.color === RED
  ) {
    parent = n.parent;
    grandparent = parent.parent;

    // CASE A: Parent is left child of grandparent.
    if (parent === grandparent.left) {
      const uncle = grandparent.right;
      // case 1: only a recolor is required.
      if (uncle && uncle.color === RED) {
        grandparent.color = RED;
        parent.color = BLACK;
        uncle.color = BLACK;
        n = grandparent;
      } else {
        // Right child = left-rotation.
        if (n === parent.right) {
          this.rotateLeft(parent);
          n = parent;
          parent = n.parent;
        }
        // Left child = right-rotation
        this.rotateRight(grandparent);
        const t = parent.color;
        parent.color = grandparent.color;
        grandparent.color = t;
        n = parent;
      }
    } else { // CASE B: Parent is right child.
      const uncle = grandparent.left;
      if (uncle && uncle.color === RED) {
        grandparent.color = RED;
        parent.color = BLACK;
        uncle.color = BLACK;
        n = grandparent;
      } else {
        if (n === parent.left) {
          this.rotateRight(parent);
          n = parent;
          parent = n.parent;
        }
        this.rotateLeft(grandparent);
        const t = parent.color;
        parent.color = grandparent.color;
        grandparent.color = t;
        n = parent;
      }
    }
  }
  this.root.color = BLACK;
};

/**
 * @name Leaf#append
 * @param {Leaf} node the node being inserted.
 */
Leaf.prototype.append = function (node) {
  const isLeft = node.value < this.value;
  const direction = isLeft ? LEFT : RIGHT;
  /** @type {Leaf?} */
  const branch = this[direction];
  /** @type {Leaf?} */
  const sibling = isLeft ? this[RIGHT] : this[LEFT];
  if (branch != null) {
    return this[direction].append(node, this, sibling);
  }
  node.parent = this;
  this[direction] = node;
  return node;
};

function inOrderHelper (node) {
  if (!node) return;
  inOrderHelper(node.left);
  console.log(node.value, node.color);
  inOrderHelper(node.right);
}

function levelOrderHelper (node) {
  if (!node) return;
  const q = new Queue();
  q.push(node);
  while (!q.isEmpty()) {
    const n = q.pop();
    console.log(n.value, n.color);
    n.left && q.push(n.left);
    n.right && q.push(n.right);
  }
}

const tree = new Tree();

tree.append(7);
tree.append(3);
tree.append(12);
tree.append(14);
tree.append(16);
tree.append(20);
tree.append(25);
tree.append(30);

console.log("In order:");
inOrderHelper(tree.root);

console.log("Level order:");
levelOrderHelper(tree.root);
