var greeting = 'Hola';

(function(global, name) {
    var greeting = 'Hello';
    global.greeting = 'Hello';
    console.log(greeting + ' ' + name);
}(window, 'John'));

console.log(greeting);
