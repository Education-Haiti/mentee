import React from 'react';
import PropTypes from 'prop-types';

import Navigation from './CommonComponents/Navigation.jsx';
import MenteeDashboard from './MenteeDashboard/MenteeDashboard.jsx';
import MentorDashboard from './MentorDashboard/MentorDashboard.jsx';
import MentorProfile from './MentorProfile/MentorProfile.jsx';
import MyProfile from  './MyProfile/MyProfile.jsx';
import AdminPortal from './AdminPortal/AdminPortal.jsx';
import Peers from './MyProfile/Peers.jsx';
import AllMentors from './MentorDashboard/AllMentors.jsx';
import MyMentees from './MyMentees/MyMentees.jsx';
import SECRETS from '../client_secrets.js'
import axios from 'axios';

class Mentee extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: '',
			userInfo: {},
			userPhoto: '',
			email: '',
			grade: '',
			level: '',
			my_mentor: {},
			my_mentor_photo: '',
			menteeLinks: [
				{ label: 'Home'},
				{ label: 'My Info'},
				{ label: 'Peers'},
				{ label: 'My Mentor'},
			],
			mentorLinks: [
				{ label: 'Dashboard'},
				{ label: 'Profile'},
				{ label: 'Mentees'},
				{ label: 'Mentors'},
			],
			adminLinks: [
				{ label: 'Dashboard'},
				{ label: 'Profile'},
				{ label: 'Mentees'},
				{ label: 'Mentors'},
				{ label: 'Config'}
			], 
			
		}
	}

	componentWillMount() {
		//this.getAuthedUserInfo();

		//Kony's dev states
		this.setState({
			my_mentor: this.props.mentor,
			my_mentor_photo: this.props.mentor.photo,
			userInfo: this.props.user,
			userPhoto: this.props.user.photo,
			currentPage: 'My Info',
			level: 'mentee'
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
			this.setState({ email: response.data.user.email}, () => {
				this.setState({ userPhoto: response.data.user.image_512 })
				this.identifyUser(response.data.user.email);
			});
			
		})
		.catch((error)=> {
			console.log('Axios error in getting authed user info !! : ', error); });
	}

	identifyUser(theEmail, type) { // identifying mentee on database. When type =2, set result equal to my_mentor
		axios.get(`/users/authed/${theEmail}`)
			.then((response) => {
				//console.log(response.data);
				if (type === 2) {
					this.setState({ my_mentor: response.data[0]}, () => {
						this.findUserByEmail_slack(this.state.my_mentor.email); // get the mentor's photo
					});
				} else {
					this.setState({ userInfo: response.data[0] }, () => {
						if (this.state.userInfo.level === "mentee") {
							this.setState({ level: 'mentee' }, () => {
								this.setState({ currentPage:  'menteeDashboard' }, () => {
									this.identifyUser(response.data[0].my_mentor_email, 2);
								});
							})	
						} else if (this.state.userInfo.grade === "admin") {
							this.setState({ level: 'admin' }, () => {
								this.setState({ currentPage: 'dashboard' });
							})
						} else if (this.state.userInfo.level === 'mentor') {
							this.setState({ level: 'mentor' }, () => {
								this.setState({ currentPage: 'dashboard' });
							})
						}

					});
				}
			
				console.log(this.state.userInfo);
				
			})
			.catch((error) => {
				console.log('Axios error in getting authed mentee info : ', error);
			});
	}

	findUserByEmail_slack(theEmail, option) { // identifying user on slack API . 
		axios.get(`https://slack.com/api/users.lookupByEmail?token=${SECRETS.BOT_TOKEN}&email=${theEmail}`)
			.then((response) => {
				//console.log('User info from SLACK API !! : ', response.data.user.profile);
                this.setState({ my_mentor_photo : response.data.user.profile.image_512 }, () => { // to retrieve the mentor's profile photo
                    console.log('new: ', this.state.displayName);
                });  
			})
			.catch((error) => {
				console.log('Axios error in getting user info from SLACK API : ', error);
			});
    }

	handleNavChange(label) {
		this.setState({
			currentPage: label
		})
	}

	renderMentorProfile () {
		return (
			<MentorProfile 
				mentor={this.state.my_mentor} 
				mentorPhoto={this.state.my_mentor_photo}
			/>
		)
	}

	renderMyProfile () {
		return (
			<MyProfile 
				user={this.state.userInfo} 
				userPhoto={this.state.userPhoto}
			/>
		)
  }
    
  renderMenteeDashboard() {
    return (
      <MenteeDashboard 
      	userInfo={this.state.userInfo} 
      	email={this.state.email} 
      	showGiveKudos={true}
      />
    )
	}
	
	renderAdminPortal() {
		return (
			<AdminPortal/>
		)
	}

	renderPeers() {
		return (
			<Peers 
				grade={this.state.userInfo.grade}
			/>
		)
	}

	renderMentorDashboard() {
		return (
			<MentorDashboard 
				userInfo={this.state.userInfo} 
				email={this.state.email}
			/>
		)
	}

	renderAllMentors() {
		return (
			<AllMentors/>
		)
	}

	renderMyMentees() {
		return (
			<MyMentees 
				email={this.state.email}
			/>
		)
	}

	renderBody () {
		let { currentPage } = this.state;
		let method = 'renderMenteeDashboard';

		if (currentPage === 'Home') {
			method = 'renderMenteeDashboard';
		} else if (currentPage === 'My Info') {
			method = 'renderMyProfile';
		} else if (currentPage === 'Peers') {
			method = 'renderPeers';
		} else if (currentPage  === 'My Mentor') {
			method = 'renderMentorProfile';
		} else if (currentPage  === 'Dashboard') {
			method =  'renderMentorDashboard';
		} else if (currentPage  === 'Profile') {
			// TO BE DONE!!
		} else if (currentPage  === 'Mentees') {
			method =  'renderMyMentees' ;
		} else if (currentPage  === 'Mentors') {
			method = 'renderAllMentors';
		} else if (currentPage  === 'Config') {
			method = 'renderAdminPortal';
		} 
		return this[method]();
	}

	renderNav () {
		let { level, userPhoto } =this.state;
		let key = (level || 'mentee') + 'Links';
		let links = this.state[key]; 

		return (
			<Navigation 
				handleNavClick={this.handleNavChange.bind(this)} 
				links={links} 
				profilePhoto={userPhoto}
			/>
		)
	}

	render() {
		var content = this.renderBody();
		var nav = this.renderNav();

		return (
			<div className="mentee-page">
				{nav}
				<div className="mentee-body-container column">
					<div className="top-padding"></div>
						{content}
				</div>
			</div>
		)
	}
}

export default Mentee;
