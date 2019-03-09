console.log(this);

function a() {
  console.log(this);
}

var b = function() {
  console.log(this);
}

a();
b();
