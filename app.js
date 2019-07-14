var people = [
    {
        firstname: 'John',
        lastname: 'Doe',
        addresses: [
            '111 Main St.',
            '222 Third St.'
        ]
    },
    {
        firstname: 'Jane',
        lastname: 'Doe',
        addresses: [
            '333 Main St.',
            '444 Fifth St.'
        ],
        greet: function() {
            return 'Hello!';
        }
    }
];

function Person(name) {
    this.name = name;
}

var e = new Person('Jane');
console.log(typeof people);
console.log(typeof people[0].firstname);
console.log(typeof people[1].greet);
console.log(e instanceof Person);
console.log(typeof undefined);
console.log(typeof null);

var z = function() {};
console.log(typeof z);
