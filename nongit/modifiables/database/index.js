const mysql = require('mysql');

const connection = mysql.createConnection({
	hots: 'localhost',
	user: 'root',
	password: '',
	database: 'mentees'
});

connection.connect((err) => {
	if (err) {
		console.log('Error connecting to mysql !! ', err);
	} else {
		console.log('Successful connection to mysql !!');
	}
})

module.exports = connection;