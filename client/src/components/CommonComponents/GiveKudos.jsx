import React from 'react';
import axios from 'axios'; 
import SECRETS from '../../client_secrets.js'


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
            kuddosReceived_Receiver: Array,
            number_kudos_received_receiver: 0,
            usernames: {}, // object to hold all usernames with email as key
        }
    }


    componentDidUpdate(prevProps) {
        
        if (this.props.email !== prevProps.email) { // IT IS EXTREMLY IMPORTANT TO CHECK THE CURRENT AND THE PREVIOUS PROPS. THIS IS REACT DOCUMENTATION. ELSE IT BREAK AND RENDERS TWICE!!
            this.setState({ email: this.props.email }, () => { // must be called-backs to be properly called
                //this.getAllUsers_slack(); 
                this.findUserByEmail_slack(this.state.email, 1); // update the displayName of the current user
                // this.initializeUsernamesObj();
            });
            
        } 

        if (this.props.usernames !== prevProps.usernames) {
            this.setState({ usernames: this.props.usernames }, () => {
                console.log('the usernamessss: ', this.state.usernames);
            });
        }

        if (this.props.allUsers !== prevProps.allUsers) {
            this.setState({ allUsers: this.props.allUsers }, () => {
                //console.log('all the users from db', this.state.allUsers)
            });
        }

        if (this.props.userInfo !== prevProps.userInfo) {
            this.setState({ kuddosGiven: this.props.userInfo.kudos_given });
        }
    }

    // initializeUsernamesObj() {
    //     axios.get(`https://slack.com/api/users.list?token=${SECRETS.BOT_TOKEN}`)
	// 		.then((response) => {
    //             console.log('All users from slack !!!! : ', response.data.members);
    //             // make an object whose key is the email of all users and value is the url to their photos
    //             let tempObj = {};
    //             let dataArray = response.data.members;
    //             for (let i = 0; i < dataArray.length; i++) {
    //                 tempObj[dataArray[i].profile.email] = dataArray[i].name; 
    //             }

    //             this.setState({ usernames: tempObj }, () => {
    //                 console.log('da usernames: ', this.state.usernames);
    //             });
				
    //         })
    //         .catch((error) => {
    //             console.log('Axios error in getting all users from SLACK API : ', error);
    //         })
    // }

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
    
    // getAllUsers_slack() {
	// 	axios.get(`https://slack.com/api/users.list?token=${SECRETS.BOT_TOKEN}`)
	// 		.then((response) => {
	// 			console.log('All users from slack !! : ', response.data.members);
	// 			this.setState({ allUsers: response.data.members })
    //         })
    //         .catch((error) => {
    //             console.log('Axios error in getting all users from SLACK API : ', error);
    //         });
    // }

    identifyReceiver(theEmail) { // identifying on database
		axios.get(`/users/authed/${theEmail}`)
			.then((response) => {
				//console.log(response.data);
				this.setState({ receiverInfo: response.data[0] }, () => {
                    console.log('receiver: ', this.state.receiverInfo);
                    this.setState({ kuddosReceived_Receiver: response.data[0].kudos_received }, () => {
                        this.setState({ number_kudos_received_receiver: response.data[0].number_kudos_received }, () => {
                            this.updateGivenKudos();
                        })
                    });

                    
                });
			})
			.catch((error) => {
				console.log('Axios error in getting authed user info : ', error);
			});
	}

    handleChange(e) {
        //console.log(e.target.value);
        this.setState({ kudosMessage: e.target.value })
    }
    
    updateReceiver(e) {
        console.log(e.target.value);
        this.setState({ receiverEmail: e.target.value });

    }

    updateGivenKudos() { // for user giving kudos
        let theName = this.state.receiverInfo.full_name;
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
            this.updateReceivedKudos();
            this.setState({ kudosMessage: '' });
        });

        // now update db
        axios.put(`/users/givenkudos/${this.state.email}`, {
            kudosGiven: kuddosObj
        })
        .then((response) => {

        })
        .catch((error) => {
            console.log('Axios-side error in updating given kudos')
        })
        
    }

    updateReceivedKudos() { // for user receiving kudos
       // newKudosReceived: this.
       let theName = this.props.userInfo.full_name;
        let date = new Date();
        let formattedDate = date.toLocaleDateString('us-EN', {year: 'numeric', month: 'long', day: 'numeric'});
        let theMessage = this.state.kudosMessage;
        let theEmail = this.props.userInfo.email;

        let tempGivenKudosObj = {
            name: theName,
            date: formattedDate,
            message: theMessage,
            email: theEmail
        }

        let kuddosObj = this.state.kuddosReceived_Receiver;

        kuddosObj.push(tempGivenKudosObj);

        // update state 
        // this.setState({ kuddosGiven: kuddosObj }, () => {
        //     this.updateReceivedKudos();
        //     this.setState({ kudosMessage: '' });
        // });

        let oldNumberOfKudos = this.state.receiverInfo.number_kudos_received;
        let theNewCount = oldNumberOfKudos + 1;

        console.log("Reveiver updated info: ", tempGivenKudosObj);
        console.log("Number received: ", oldNumberOfKudos);

        // now update db
        axios.put(`/users/receivedkudos/${this.state.receiverEmail}`, {
            kudosReceived: kuddosObj,
            newCount: theNewCount
        })
        .then((response) => {

        })
        .catch((error) => {
            console.log('Axios-side error in updating given kudos')
        })
       
    }





    submitKudos() {
        if(this.state.kudosMessage.length === 0) {
            alert('Please make sure to input a kudos before submitting! :) ');
            return;
        }
        if (this.state.kudosMessage.length > 150) {
            alert('Please make a kudos of less than 150 characters :) ');
            return;
        } else if(this.state.kudosMessage.length > 0 && this.state.kudosMessage.length <= 150){
            axios.post('/users/slack/kudos', {
                message: `NEW KUDOS! @${this.state.displayName} sent a kudos to @${this.state.usernames[this.state.receiverEmail]} : " ${this.state.kudosMessage} " \n\n *** Let's keep helping each other! ***`,
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
                            return <option name="a" value={ user.email } key = { index }> { user.full_name } </option>  
                            })     
                        }
                    </select>
                </div>

                <textarea value={this.state.kudosMessage} className="give-kudos-input" type="text" onChange={this.handleChange.bind(this)}/>
                   
                <div>
                    <button className="give-kudos-b" onClick={this.submitKudos.bind(this)}> Submit </button>
                    <button className="give-kudos-b" onClick={this.cancelKudos.bind(this)}> Cancel </button>
                </div>
            </div>
        )
    }
}

export default GiveKudos;