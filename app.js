var Tony = {
	fistname: 'Tony',
	lastname: "Alicea',
	address: {
		street: '111 Main St.',
		city: 'New York',
		state: 'NY'
	}
};

function greet(person) {
	console.log('Hi ' + person.firstname);
}

greet(Tony);

greet({ firstname: 'Mary', lastname: 'Doe' });
