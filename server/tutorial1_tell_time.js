env = require('env2')('../.env');  // required to access the environment variables
const { IncomingWebhook, WebClient } = require('@slack/client');
console.log('Getting started with Slack Developer Kit for Node.js');

const timeNotification = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
const currentTime = new Date().toTimeString();
timeNotification.send(`Hey JP, current time is ${currentTime}`, (error, resp) => {
  if (error) {
    return console.error(error);
  }
  console.log('Notification sent', resp);
});

