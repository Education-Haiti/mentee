const connection = require('./index.js');

const getAuthedMentee = (theEmail, whenGotten) => {
	const theQuery = `SELECT * FROM mentees_table WHERE email = '${theEmail}'`;
	connection.query(theQuery, (err, res) => {
		if(err) {
			console.log('Database-side error in retrieving authed mentee info : ', err);
		} else {
			whenGotten(null, res);
		}
	})
}

/*getAuthedMentee('jvertil@nd.edu', (err, res) => {
	console.log('Here it is! ', res);
})*/

module.exports = {
	getAuthedMentee,
}