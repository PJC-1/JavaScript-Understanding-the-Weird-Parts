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
