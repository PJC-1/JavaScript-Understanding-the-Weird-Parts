var person = {
    firstname: 'John',
    lastname: 'Doe',
    getFullName: function() {

        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;

    }
}

var logNmae = function(lang1, lang2) {

    console.log('Logged: ' + this.getFullName());

}

var logPersonName = logName.bind(person);

logPersonName();
