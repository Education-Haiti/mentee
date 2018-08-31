import React from 'react';
import axios from 'axios';
import SECRETS from './client_secrets.js'
import { Route, Switch } from 'react-router-dom';

class MenteeHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menteeInfo: {},
		

		}
	}

	componentDidMount() {
		this.getAuthedUserInfo();
	}

	identifyMentee(theEmail) {
		axios.get(`/mentees/authed/${theEmail}`)
			.then((response) => {
				console.log('from client', response);
				this.setState({menteeInfo: response.data[0]});
			})
			.cath((error) => {
				console.log('Axios error in getting authed mentee info');
			});
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