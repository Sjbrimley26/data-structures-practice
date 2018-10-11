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
  
};