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

	 componentWillMount() {
	 	this.initializeDisplayPhotosAndHandlesObj();
	 	this.identifyMentor(this.props.mentorEmail);
	 	this.setState({
	 		menteeInfo: this.props.userInfo,
	 		email: this.props.email,
	 		showGiveKuddos: this.props.showGiveKudos,
	 		showGiveWarning: !this.props.showGiveKudos
	 	})

	 	//>>>>>>>PRE-REFACTOR: DELETE ME AFTER REVIEW!!!<<<<<<<<
		// this.initializeDisplayPhotosAndHandlesObj();
	 // 	this.setState({ menteeInfo: this.props.userInfo });
		// this.setState({ email: this.props.email }, () => {
		// 	console.log('here di emailll', this.props.email);
		// 	this.identifyMentor(this.props.mentorEmail);
		// });
		// this.setState({ showGiveKuddos: this.props.showGiveKudos });
		// this.setState({ showGiveWarning:  !this.props.showGiveKudos});
		
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

      this.setState({ 
      	displayPhotos: tempObj,
      	slackHandles: tempHandles 
      }, this.getAllUsers);
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
    let totalItems = Object.keys(items).length;
    let amountCompleted = 0; 

    for (var key in items) {
      if (items[key] === true) {
          amountCompleted++;
      }
		}
		let percentComp = Math.floor((amountCompleted/totalItems)*100);
		this.setState({ percentComplete: percentComp});
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
		let { 
			menteeInfo, 
			mentorInfo,
			email, 
			slackHandles, 
			allUsers, 
			displayPhotos, 
			showGiveKuddos, 
			showGiveWarning, 
			percentComplete 
		} = this.state;

		let giveKuddos = !showGiveKuddos? null: (
			<GiveKudos 
				userInfo={menteeInfo} 
				email={email} 
				usernames={slackHandles} 
				allUsers={allUsers}
			/>
		)

		let giveWarning = !showGiveWarning? null: (
			<GiveWarning 
				issuer={mentorInfo.full_name} 
				warningsReceived={menteeInfo.warnings_received} 
				numberOfWarnings={menteeInfo.number_warnings_received} 
				menteeEmail={menteeInfo.email}
			/>
		)
		
	  return (
	    <div>
				<div 
					className="menteeHomeMainContainer"
				>
					<Checklist 
						calcCompleteness={this.calculatePercentCompleteness.bind(this)} 
						email={email}
					/>
					<div>
						<div 
							className="mentee-dashboard-name column"
						> 
							{menteeInfo.full_name}
						</div>
						<KudosSummary 
							userInfo={menteeInfo} 
							displayPhotos={displayPhotos}/>
					</div>
					<div 
						className="mentee-rightmost-vertical-container column"
					>
					  {giveKuddos}
					  <CircularProgressbar 
					  	percentage={percentComplete} 
					  	text={`${percentComplete}%`}
					  />
					  {giveWarning}
					  <WarningsSummary 
					  	warnings={menteeInfo.warnings_received}
					  />
					</div>	
				</div>
	    </div>
	  )
	}
}

export default MenteeDashboard;
