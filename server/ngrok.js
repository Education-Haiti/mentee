env = require('env2')('../.env');  // required to access the environment variables
const bodyParser = require('body-parser');
const path = require('path');
const url = require('url');
const queries = require('../database/queries.js');
const queries2 = require('../database/index2.js');
const { WebClient } = require('@slack/client');

// Import express and request modules
var express = require('express');
var request = require('request');

// Store our app's ID and Secret. These we got from Step 1. 
// For this tutorial, we'll keep your API credentials right here. But for an actual app, you'll want to  store them securely in environment variables. 
var clientId = process.env.CLIENT_ID;
var clientSecret = process.env.CLIENT_SECRET;

console.log(clientId);
console.log(clientSecret);
console.log(process.env.SLACK_TOKEN);
// Instantiates Express and assigns our app variable to it
var app = express();

app.use(express.static(path.join(__dirname, '../client/dist/')));


// Again, we define a port we want to listen to
const PORT=4390;

// Lets start our server
app.listen(PORT, function () {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Example app listening on port " + PORT);
});

/*app.use(bodyParser.urlencoded({ extended: false }))
*/app.use(bodyParser.json());

// This route handles GET requests to our root ngrok address and responds with the same "Ngrok is working message" we used before
 app.get('/', function(req, res) {
     res.send('Ngrok is working! Path Hit: ' + req.url);

 });


// This route handles get request to a /oauth endpoint. We'll use this endpoint for handling the logic of the Slack oAuth process behind our app.
app.get('/oauth', function(req, res) {
    // When a user authorizes an app, a code query parameter is passed on the oAuth endpoint. If that code is not there, we respond with an error message
    if (!req.query.code) {
        //res.status(500);
        //res.send({"Error": "Looks like we're not getting code."});
        console.log("Looks like we're not getting code.");
        res.redirect(url.format({
            pathname: 'http://localhost:3000',
            query: {
                'slack': req.query.code,
            }
        }))
    } else {
        // If it's there... 
        res.redirect(url.format({
                        pathname: '/',
                        query: {
                            'slack': req.query.code,
                        }
                    }))
    }
});

app.get('/users/', (req, res) => {
    queries2.getUsers((err, results) => {
        if (err) {
            console.log('Server-side error in retrieving users');
        } else {
            res.json(results);
        }
    });
});

app.get('/users/authed/:email/', (req, res) => {
    const theEmail = req.params.email;
    queries2.getUserByEmail(theEmail, (err, results) => {
        if (err) {
            console.log('Server-side error in retrieving info of authed user : ', err);
            res.end();
        } else {
            res.json(results);

        }
    });
});

app.get('/users/mentees/grade/:grade', (req, res) => {
    const theGrade = req.params.grade;
    queries2.getMenteesByGrade(theGrade, (err, results) => {
        if (err) {
            console.log('Server-side error in retrieving mentees by grade : ', err);
            res.end();
        } else {
            res.json(results);
        }
    });
});

app.post('/users/new', (req, res) => {
    const userObj = req.body.user;
    queries2.saveUser(userObj, (err, results) => {
        if (err) {
            console.log('Server-side error in creating new user : ', err);
            res.sendStatus(500);
        } else {
            console.log('Success');
        }
    })
    res.sendStatus(201);
})

app.get('/users/checklist/:email/', (req, res) => {
    const theEmail = req.params.email;
    queries2.getChecklist(theEmail, (err, results) => {
        if (err) {
            console.log('Server-side error in getting the checklist : ', err);
        } else {
            res.json(results);
        }
    })
})

app.get('/users/topfive/mentors', (req, res) => {
    queries2.getTopFiveMentors((err, results) => {
        if (err) {
            console.log('Server-side error in getting top five mentors : ', err);
        } else {
            res.json(results);
        }
    })
})

app.get('/users/allmentors/', (req, res) => {
    queries2.getAllMentors((err, results) => {
        if (err) {
            console.log('Server-side error in getting all mentors: ', err);
        } else {
            res.json(results);
        }
    })
})

app.put('/users/checklist/:email/', (req, res) => {
    const theEmail = req.params.email; 
    const newChecklist = req.body.newChecklist;
    queries2.updateChecklist(theEmail, newChecklist, (err, results) => {
        if (err) {
            console.log('Server-side error in updating the checklist : ', err);
        } 
    })
    res.sendStatus(200);
})

app.put('/users/givenkudos/:email/', (req, res) => {
    const theEmail = req.params.email;
    const newKudosGiven = req.body.kudosGiven;
    queries2.updateKudosGiven(theEmail, newKudosGiven, (err, results) => {
        if (err) {
            console.log('Server-side error in updating kudos given : ', err);
        }
    })
    res.sendStatus(200);
})

app.put('/users/receivedkudos/:email/', (req, res) => {
    const theEmail = req.params.email;
    const newKudosReceived = req.body.kudosReceived;
    const newCount = req.body.newCount;
    queries2.updateKudosReceived(theEmail, newKudosReceived, newCount, (err, results) => {
        if (err) {
            console.log('Server-side error in updating kudos received : ', err);
        }
    })
    res.sendStatus(200);
})

// Posting to Slack
app.post('/users/slack/kudos', (req, res) => {
        const theMessage = req.body.message;
        const theChannel = req.body.channel;

        // An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
        const token = process.env.SLACK_TOKEN; 
        const web = new WebClient(token);
        

       web.chat.postMessage({ channel: theChannel, text: theMessage })
        .then((res) => {
        // `res` contains information about the posted message
        console.log('Message sent: ', res.ts);
        })
        .catch(console.error);
        
    res.sendStatus(201);
})

// Route the endpoint that our slash command will point to and send back a simple response to indicate that ngrok is working
app.post('/command', function(req, res) {
    res.send('Your ngrok tunnel is up and running!');
});

app.delete('/users/', (req, res) => {
    const theEmail = req.body.email;
    queries2.removeUser(theEmail, (err, result) => {
        if (err) {
            console.log('Server-side error in deleting user : ', err);
        }
    })
    res.sendStatus(200);
})



























