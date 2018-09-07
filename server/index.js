<<<<<<< HEAD
env = require('env2')('../.env');  // required to access the environment variables
PORT = process.env.PORT;

express = require('express'),
app = express();
console.log(PORT);

app.listen(PORT, () => {
	console.log('App listening on Port ', PORT);
});

app.get('/slack/login', (req, res) => {
	res.redirect('https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=18715587520.415941101539')
})
=======
const express = require('express');
const path = require('path');

const app = express(); 

// middleware for logging
app.use((req, res, next) => {
	console.log(req.method, req.path); // display the method and the path
	next();
});

app.use(express.static(path.join(__dirname, '../client/dist'))); 

const bodyParser = require('body-parser');
app.use(bodyParser.json()); 

app.listen(3001, () => console.log('Mentee server listening on localhost:3001'));
>>>>>>> bdbbdb6b22c57b0e188d24789e2e3b8fb75711e8
