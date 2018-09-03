import React from 'react';
import axios from 'axios';
import SECRETS from './client_secrets.js'
import { Route, Switch } from 'react-router-dom';
import Checklist from './Checklist.jsx';
import GiveKudos from './GiveKudos.jsx';

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

	identifyMentee(theEmail) { // identifying mentee on database
		axios.get(`/mentees/authed/${theEmail}`)
			.then((response) => {
				this.setState({ menteeInfo: response.data[0] });
			})
			.catch((error) => {
				console.log('Axios error in getting authed mentee info : ', error);
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
			console.log('Email is ... : ', response.data.user.email);
			this.identifyMentee(response.data.user.email);
		})
		.catch((error)=> {
			console.log('Axios error in getting authed user info !! : ', error); });
	}

	render() {
	    return (
	       <div>
			<div class="menteeHomeMainContainer">
				<Checklist/>
				<GiveKudos/>
			</div>
	      	{/* <div className="welcome-text">
	        	Welcome {this.state.menteeInfo.first_name + ' ' + this.state.menteeInfo.last_name}
	        </div> */}
	      </div>
	    );
  	  }
}

export default MenteeHome;