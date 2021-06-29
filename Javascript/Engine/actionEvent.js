export var ActionEvent = function() {
  this.listeners = [];

  this.addEventListener = addEventListener.bind(this);
  this.removeEventListener = removeEventListener.bind(this);
  this.invoke = invoke.bind(this);
};

function addEventListener(callback) {
  this.listeners.push(callback);
};

function removeEventListener(callback)
{
  for (var i = 0; i < this.listeners.length; i++) {
    if (this.listeners[i] == callback){
      stack.splice(i, 1);
      return;
    }
  }
};

function invoke(event) {
  for (var i = 0; i < this.listeners.length; i++) {
    this.listeners[i].call(this, event);
  }
};
