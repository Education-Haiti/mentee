import React from 'react';
import axios from 'axios'; 
import SECRETS from './client_secrets.js'


class GiveKudos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', 
            menteeInfo: {}, // may not be necessary
            allUsers: [],
            displayName: '',
            kudosMessage: '',
            receiverEmail: '',
            receiverInfo: {},
            kuddosReceived: Array,
            kuddosGiven: Array,
            usernames: {}, // object to hold all usernames with email as key
        }
    }

    componentDidUpdate(prevProps) {
        
        if (this.props.email !== prevProps.email) { // IT IS EXTREMLY IMPORTANT TO CHECK THE CURRENT AND THE PREVIOUS PROPS. THIS IS REACT DOCUMENTATION. ELSE IT BREAK AND RENDERS TWICE!!
            this.setState({ email: this.props.email }, () => { // must be called-backs to be properly called
                this.getAllUsers_slack(); 
                this.findUserByEmail_slack(this.state.email, 1); // update the displayName of the current user
                this.initializeUsernamesObj();
            })
        } 

        if (this.props.menteeInfo !== prevProps.menteeInfo) {
            this.setState({ kuddosGiven: this.props.menteeInfo.kudos_given });
        }
    }

    initializeUsernamesObj() {
        axios.get(`https://slack.com/api/users.list?token=${SECRETS.BOT_TOKEN}`)
			.then((response) => {
                console.log('All users from slack !!!! : ', response.data.members);
                // make an object whose key is the email of all users and value is the url to their photos
                let tempObj = {};
                let dataArray = response.data.members;
                for (let i = 0; i < dataArray.length; i++) {
                    tempObj[dataArray[i].profile.email] = dataArray[i].name; 
                }

                this.setState({ usernames: tempObj }, () => {
                    console.log('da usernames: ', this.state.usernames);
                });
				
            })
            .catch((error) => {
                console.log('Axios error in getting all users from SLACK API : ', error);
            })
    }

    findUserByEmail_slack(theEmail, option) { // identifying user on slack API . 
		axios.get(`https://slack.com/api/users.lookupByEmail?token=${SECRETS.BOT_TOKEN}&email=${theEmail}`)
			.then((response) => {
                //console.log('User info from SLACK API !! : ', response.data.user.profile);
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
            .catch((error) => {
                console.log('Axios error in getting all users from SLACK API : ', error);
            });
    }

    identifyReceiver(theEmail) { // identifying on database
		axios.get(`/mentees/authed/${theEmail}`)
			.then((response) => {
				//console.log(response.data);
				this.setState({ receiverInfo: response.data[0] }, () => {
                    console.log('receiver: ', this.state.receiverInfo);
                    this.updateGivenKudos();
                });
			})
			.catch((error) => {
				console.log('Axios error in getting authed mentee info : ', error);
			});
	}

    handleChange(e) {
        //console.log(e.target.value);
        this.setState({ kudosMessage: e.target.value })
    }
    
    updateReceiver(e) {
        //console.log(e.target.value);
        console.log('email', e.name);
        this.setState({ receiverEmail: e.target.value });

    }

    updateGivenKudos() { // for user giving kudos
        let theName = this.state.receiverInfo.first_name + ' ' + this.state.receiverInfo.last_name;
        let date = new Date();
        let formattedDate = date.toLocaleDateString('us-EN', {year: 'numeric', month: 'long', day: 'numeric'});
        let theMessage = this.state.kudosMessage;
        let theEmail = this.state.receiverInfo.email;

        let tempGivenKudosObj = {
            name: theName,
            date: formattedDate,
            message: theMessage,
            email: theEmail
        }

        let kuddosObj = this.state.kuddosGiven;

        kuddosObj.push(tempGivenKudosObj);

        // update state 
        this.setState({ kuddosGiven: kuddosObj }, () => {
            this.setState({ kudosMessage: '' });
        });

        // now update db
        axios.put(`/mentees/givenkudos/${this.state.email}`, {
            kudosGiven: kuddosObj
        })
        .then((response) => {

        })
        .catch((error) => {
            console.log('Axios-side error in updating given kudos')
        })
        
    }

    updateReceivedKudos(theEmail, newKuddosReceivedObj) { // for user receiving kudos
       // newKudosReceived: this.
    }



    submitKudos() {
        if (this.state.kudosMessage.length > 150) {
            alert('Please make a kudos of less than 150 characters :) ');
        } else {
            axios.post('/mentees/slack/kudos', {
                message: `NEW KUDOS! @${this.state.displayName} sent a kudos to @${this.state.usernames[this.state.receiverEmail]} for ${this.state.kudosMessage} \n\n *** Let's keep helping each other! ***`,
                channel: 'websitetesting'
            })
            .then((response) => {
                // update the database for user giving kudos
                this.identifyReceiver(this.state.receiverEmail);
                
                // udpate the database for user receiving kudos

            })
            .catch((error) => {
                console.log('Axios error in making post to slack');
            });
            
            
        }
        
    }

    cancelKudos() {
        this.setState({ kudosMessage: '' });
    } 

    render () {
        return (
            <div className="give-kudos-container">
                <div className="give-kudos-title">
                    Give kudos!
                </div>

                <div>
                    <select onChange={ this.updateReceiver.bind(this) }> 
                        {
                            this.state.allUsers.map((user, index) => {
                            return <option name="a" value={ user.profile.email } key = { index }> { user.profile.real_name } </option>  
                            })
                            
                        }
                    </select>
                </div>

                <input value={this.state.kudosMessage} className="give-kudos-input" type="text" onChange={this.handleChange.bind(this)}/>
                   
                <div>
                    <button className="give-kudos-b" onClick={this.submitKudos.bind(this)}> Submit </button>
                    <button className="give-kudos-b" onClick={this.cancelKudos.bind(this)}> Cancel </button>
                </div>
            </div>
        )
    }
}

export default GiveKudos;