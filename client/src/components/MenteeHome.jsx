import React from 'react';
import axios from 'axios';
import SECRETS from './client_secrets.js'
import { Route, Switch } from 'react-router-dom';

class MenteeHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menteeInfo: {},
			allusers: []
		

		}
	}

	componentDidMount() {
		this.getAuthedUserInfo();
		this.findUserByEmail_slack('jvertil@nd.edu');
		this.getAllUsers_slack();
	}

	identifyMentee(theEmail) { // identifying mentee on database
		axios.get(`/mentees/authed/${theEmail}`)
			.then((response) => {
				this.setState({ menteeInfo: response.data[0] });
			})
			.catch((error) => {
				console.log('Axios error in getting authed mentee info : ', error);
			});
	}

	findUserByEmail_slack(theEmail) { // identifying user on slack API 
		axios.get(`https://slack.com/api/users.lookupByEmail?token=${SECRETS.BOT_TOKEN}&email=${theEmail}`)
			.then((response) => {
				console.log('User info from SLACK API !! : ', response.data.user.profile);
			})
			.catch((error) => {
				console.log('Axios error in getting user info from SLACK API : ', error);
			});

	}

	getAllUsers_slack() {
		axios.get(`https://slack.com/api/users.list?token=${SECRETS.BOT_TOKEN}`)
			.then((response) => {
				console.log('All users from slack !! : ', response.data.members);
				this.setState({ allusers: response.data.members })
			})
	}

	getAuthedUserInfo() {
		const slackCodeRaw = window.location.search;
		const slackCode = slackCodeRaw.slice(7); // to remove the key of 'slack=' specified on the server side
		
		axios.get('https://slack.com/api/oauth.access', {
			params: {
				code: slackCode,
				client_id: SECRETS.CLIENT_ID,
				client_secret: SECRETS.CLIENT_SECRET,
			}
		})
		.then((response) => {
			console.log('Email is ... : ', response.data.user.email);
			this.identifyMentee(response.data.user.email);
		})
		.catch((error)=> {
			console.log('Axios error in getting authed user info !! : ', error); });
	}

	handleChange(event) {
		console.log(event)
		this.setState({value: event.target.value}, console.log(this.state))
	}

	handleSubmit(event) {
		axios.post('/mentees/slack/dev', {
			message: this.state.value,
			channel: 'websitetesting'
		})
		.then((response) => {

		})
		.catch((error) => {
			console.log('Axios error in making post to slack');
		})
	}

	render() {
	    return (
	       <div>
	      	<div className="welcome-text">
	        	Welcome {this.state.menteeInfo.first_name + ' ' + this.state.menteeInfo.last_name}
	        </div>

	        <div>
	        	Submit a text to Slack!
	        </div>

		        <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
		        <button type="submit" onClick={this.handleSubmit.bind(this)}> Sumbit </button>

	      </div>
	    );
  	  }
	
}

export default MenteeHome;