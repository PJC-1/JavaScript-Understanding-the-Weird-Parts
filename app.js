greet();

// function statement - hoisted into memory during the creation phase of the execution context.
function greet() {
  console.log('hi');
}

// function expression - used as part of the equals operator, to set it equalt to a variable.
var anonymousGreet = function() {
  console.log('hi');
}

// used variable to invoke it.
anonymousGreet();

function log(a) {
  a();
}

// function expression - that is passed a function as a parameter to another function.
log(function() {
  console.log('hi');
});
