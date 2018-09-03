import React from 'react';
import axios from 'axios'; 
import SECRETS from './client_secrets.js'


class GiveKudos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'jvertil@nd.edu', 
            allUsers: [],
            displayName: '',
            kudosMessage: '',
            receiver: ''
        }
    }

    componentDidMount() {
        this.getAllUsers_slack();
        this.findUserByEmail_slack(this.state.email); // update the displayName of the current user
    }

    findUserByEmail_slack(theEmail) { // identifying user on slack API 
		axios.get(`https://slack.com/api/users.lookupByEmail?token=${SECRETS.BOT_TOKEN}&email=${theEmail}`)
			.then((response) => {
                console.log('User info from SLACK API !! : ', response.data.user.profile);
                this.setState({ displayName : response.data.user.name }, () => {
                    console.log('new: ', this.state.displayName);
                });
			})
			.catch((error) => {
				console.log('Axios error in getting user info from SLACK API : ', error);
			});

    }
    
    getAllUsers_slack() {
		axios.get(`https://slack.com/api/users.list?token=${SECRETS.BOT_TOKEN}`)
			.then((response) => {
				console.log('All users from slack !! : ', response.data.members);
				this.setState({ allUsers: response.data.members })
			})
    }

    handleChange(e) {
        //console.log(e.target.value);
        this.setState({ kudosMessage: e.target.value })
    }
    
    updateReceiver(e) {
        //console.log(e.target.value);
        this.setState({ receiver: e.target.value });
    }

    submitKudos() {
        axios.post('/mentees/slack/kudos', {
			message: `NEW KUDOS! @${this.state.displayName} sent a kudos to @${this.state.receiver} for ${this.state.kudosMessage} \n\n *** Let's keep helping each other! ***`,
			channel: 'websitetesting'
		})
		.then((response) => {

		})
		.catch((error) => {
			console.log('Axios error in making post to slack');
		})
    }

    render () {
        return (
            <div class="give-kudos-container">
                <div class="give-kudos-title">
                    Give kudos!
                </div>

                <div>
                    <select onChange={ this.updateReceiver.bind(this) }> 
                        {
                            this.state.allUsers.map((user, index) => {
                            return <option value={ user.name } key = { index }> { user.profile.real_name } </option>  
                            })
                            
                        }
                    </select>
                </div>

                <input class="give-kudos-input" type="text" onChange={this.handleChange.bind(this)}/>
                   
                <div>
                    <button class="give-kudos-b" onClick={this.submitKudos.bind(this)}> Submit </button>
                    <button class="give-kudos-b"> Cancel </button>
                </div>
            </div>
        )
    }
}

export default GiveKudos;