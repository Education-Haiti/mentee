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
