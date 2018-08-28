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