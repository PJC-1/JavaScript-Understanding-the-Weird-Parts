// function statement
function greet(name) {
    console.log('Hello ' + name);
}
greet('John');

// function expression
var greetFunc = function(name) {
    console.log('Hello ' + name);
};
greetFunc('John');

// using an Immediately Invode Function Expression (IIFE)
var greeting = function(name) {
    return 'Hello ' + name;
}('John');
console.log(greeting);

(function(name) {
    return 'Hello ' + name;
});
