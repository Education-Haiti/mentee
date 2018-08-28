env = require('env2')('../.env');  // required to access the environment variables
const bodyParser = require('body-parser');
const path = require('path');
const url = require('url');
// Import express and request modules
var express = require('express');
var request = require('request');

// Store our app's ID and Secret. These we got from Step 1. 
// For this tutorial, we'll keep your API credentials right here. But for an actual app, you'll want to  store them securely in environment variables. 
var clientId = process.env.CLIENT_ID;
var clientSecret = process.env.CLIENT_SECRET;

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
//     console.log('req.query is ', req.query);
//     console.log('req.query.code is ', req.query.code);

//     res.send('req.query is ', req.query);
 });


// This route handles get request to a /oauth endpoint. We'll use this endpoint for handling the logic of the Slack oAuth process behind our app.
app.get('/oauth', function(req, res) {
    // When a user authorizes an app, a code query parameter is passed on the oAuth endpoint. If that code is not there, we respond with an error message
    if (!req.query.code) {
        res.status(500);
        res.send({"Error": "Looks like we're not getting code."});
        console.log("Looks like we're not getting code.");
    } else {
        // If it's there...
        res.redirect(url.format({
                        pathname: '/',
                        query: {
                            'slack': req.query.code,
                        }
                    }))

        // We'll do a GET call to Slack's `oauth.access` endpoint, passing our app's client ID, client secret, and the code we just got as query parameters.
       /* request({
            url: 'https://slack.com/api/oauth.access', //URL to hit
            qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret}, //Query string data
            method: 'GET', //Specify the method

        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                const parsedObject = JSON.parse(body);
                console.log('Here is the data !! ', parsedObject.user.email);
                //res.json(JSON.parse(body));
                if (parsedObject.user.email === 'jvertil@nd.edu') {
                    //res.redirect('/');
                    res.redirect(url.format({
                        pathname: '/',
                        query: {
                            'email': 'jvertil@nd.edu'
                        }
                    }))
                } else {
                    res.sendStatus(400);
                }
                

            }
        })*/
    }
});

// Route the endpoint that our slash command will point to and send back a simple response to indicate that ngrok is working
app.post('/command', function(req, res) {
    res.send('Your ngrok tunnel is up and running!');
});