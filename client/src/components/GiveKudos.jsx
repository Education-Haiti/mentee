import React from 'react';
import axios from 'axios'; 
import SECRETS from './client_secrets.js'


class GiveKudos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'jvertil@nd.edu'
        }
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

    render () {
        return (
            <div>
                This is the kudos component rendering !!
            </div>
        )
    }
}

export default GiveKudos;