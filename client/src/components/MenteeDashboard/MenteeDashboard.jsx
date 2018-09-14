import React from 'react';
import axios from 'axios';
import SECRETS from '../../client_secrets.js'
import { Route, Switch } from 'react-router-dom';
import Checklist from './Checklist.jsx';
import GiveKudos from '../CommonComponents/GiveKudos.jsx';
import KudosSummary from '../CommonComponents/KudosSummary.jsx';
import '../../../dist/styles.css';
import CircularProgressbar from 'react-circular-progressbar';
import WarningsSummary from '../Warnings/WarningsSummary.jsx';
import GiveWarning from '../Warnings/GiveWarning.jsx';

class MenteeDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menteeInfo: {},
			allUsers: [],
			email: '',
			percentComplete: 0,
			displayPhotos: {},
			slackHandles: {},
			showGiveKuddos: false,
			showGiveWarning: false,
			mentorInfo: {},
		}
	}

	 componentDidMount() {
		this.initializeDisplayPhotosAndHandlesObj();
	 	this.setState({ menteeInfo: this.props.userInfo });
		this.setState({ email: this.props.email }, () => {
			console.log('here di emailll', this.props.email);
			this.identifyMentor(this.props.mentorEmail);
		});
		this.setState({ showGiveKuddos: this.props.showGiveKudos });
		this.setState({ showGiveWarning:  !this.props.showGiveKudos});
		
	 }


	initializeDisplayPhotosAndHandlesObj() {
        axios.get(`https://slack.com/api/users.list?token=${SECRETS.BOT_TOKEN}`)
			.then((response) => {
                console.log('All users from slack !!!! : ', response.data.members);
                // make an object whose key is the email of all users and value is the url to their photos
                let tempObj = {};
                let tempHandles = {};
                let dataArray = response.data.members;
                for (let i = 0; i < dataArray.length; i++) {
                    tempObj[dataArray[i].profile.email] = dataArray[i].profile.image_512; 
                    tempHandles[dataArray[i].profile.email] = dataArray[i].name;
                }

                this.setState({ displayPhotos: tempObj }, () => {
                    this.setState({ slackHandles: tempHandles }, () => {
                        this.getAllUsers();
                    });
                    
                });
                
				
            })
            .catch((error) => {
                console.log('Axios error in getting all users from SLACK API : ', error);
            })
    }

    getAllUsers() {
        axios.get('/users')
            .then((response) => {
                //console.log('All users: ', response);
                this.setState({ allUsers: response.data }, () => {
                    console.log('allllluuuseerrrss: ', this.state.allUsers);
                });
            })
            .catch((error) => {
                console.log('Axios error in retrieving users', error);
            })
    }

	calculatePercentCompleteness(items) {
		if (items !== undefined) {
			let totalItems = Object.keys(items).length;
			let amountCompleted = 0; 
	
			for (var key in items) {
				if (items[key] === true) {
					amountCompleted++;
				}
			}
			let percentComp = Math.floor((amountCompleted/totalItems)*100);
			this.setState({ percentComplete: percentComp});
		} else {
			this.setState({ percentComplete: 0});
		}
        
    }

	identifyMentor(theEmail) { // identifying mentee on database NO LONGER NEEDED HERE !!!
		axios.get(`/users/authed/${theEmail}`)
			.then((response) => {
				console.log('The mentorrrrrr', response.data);
				this.setState({ mentorInfo : response.data[0] });
			})
			.catch((error) => {
				console.log('Axios error in getting authed mentee info : ', error);
			});
	}




	render() {
		let giveKuddos = null;
		let giveWarning = null;
		if (this.state.showGiveKuddos === true) {
			giveKuddos = (
				<GiveKudos userInfo={this.state.menteeInfo} email={this.state.email} usernames={this.state.slackHandles} allUsers={this.state.allUsers}/>
			)
		}

		if (this.state.showGiveWarning === true) {
			giveWarning = <GiveWarning issuer={this.state.mentorInfo.full_name} warningsReceived={this.state.menteeInfo.warnings_received} numberOfWarnings={this.state.menteeInfo.number_warnings_received} menteeEmail={this.state.menteeInfo.email}/>
		}

		
	    return (
	       <div>
			<div className="menteeHomeMainContainer">
				<Checklist calcCompleteness={this.calculatePercentCompleteness.bind(this)} email={this.state.email}/>
				<div>
					<div className="mentee-dashboard-name column"> 
						{this.state.menteeInfo.full_name}
					</div>
					<KudosSummary userInfo={this.state.menteeInfo} displayPhotos={this.state.displayPhotos}/>
				</div>
				<div className="mentee-rightmost-vertical-container column">
				  {giveKuddos}
				  <CircularProgressbar percentage={this.state.percentComplete} text={`${this.state.percentComplete}%`} />
				  {giveWarning}
				  <WarningsSummary warnings={this.state.menteeInfo.warnings_received}/>
				</div>	
			</div>
	      </div>
	    );
  	  }
}

export default MenteeDashboard;
