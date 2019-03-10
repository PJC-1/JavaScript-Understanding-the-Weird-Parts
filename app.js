console.log(this);

function a() {
  console.log(this);
  this.newvariable = 'hello';
}

var b = function() {
  console.log(this);
}

a();

console.log(newvariable);

b();

var c = {
  name: 'The c object',
  log: function() {
      this.name = 'Updated c object';
      console.log(this);
  }
}

c.log();
