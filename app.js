function makeGreeting(language) {

    return function(firstname, lastname) {

        if(language === 'en') {
            console.log('Hello ' + firstname + ' ' + lastname);
        }

        iflanguage === 'es') {
            console.log('Hola ' + firstname + ' ' + lastname);
        }

    }

}

var greetEnglish = makeGreeting('en');
var greetspanish = makeGreeting('es');

greetEnglish('John', 'Doe');
greetSpanish('John', 'Doe');
