import React from 'react';
import axios from 'axios';
import SECRETS from './client_secrets.js'
import { Route, Switch } from 'react-router-dom';

class MenteeHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {


		}
	}

	componentDidMount() {
		this.getAuthedUserInfo();
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
			console.log('Here is the response !!', response);
		})
		.catch((error)=> {
			console.log('Axios error in getting authed user info !! : ', error);
		});


	}

	render() {
	    return (
	      <div>
	        I am da mentee react component!!
	      </div>
	    );
  	  }
	
}

export default MenteeHome;