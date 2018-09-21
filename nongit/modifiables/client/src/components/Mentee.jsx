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
				} else if (type === 3) {
					this.setState({ userInfo: response.data[0] }, () => {
						this.setState({ currentPage: 'myProfile' });
					}); // to get update after updating user info

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
			
				// console.log(this.state.userInfo);
				
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
                   // console.log('new: ', this.state.displayName);
                });  
			})
			.catch((error) => {
				console.log('Axios error in getting user info from SLACK API : ', error);
			});
    }

	handleNavChange(label) {
		// console.log(label);
		if (label === 'Home') {
			this.setState({ currentPage: 'menteeDashboard'});
		} else if (label === 'My Info') {
			this.identifyUser(this.state.email, 3);
			// this.setState({ currentPage: 'myProfile' });
		} else if (label === 'Peers') {
			this.setState({ currentPage: 'peers' });
		} else if (label === 'My Mentor') {
			this.setState({ currentPage: 'mentorProfile' });
		} else if (label === 'Dashboard') {
			this.setState({ currentPage: 'dashboard' });
		} else if (label === 'Profile') {
			this.identifyUser(this.state.email, 3);
		} else if (label === 'Mentees') {
			this.setState({ currentPage: 'myMentees' });
		} else if (label === 'Mentors') {
			this.setState({ currentPage: 'allMentors' });
		} else if (label === 'Config') {
			this.setState({ currentPage: 'adminPortal' })
		} 

	}

	renderMentorProfile () {
		return (
			<MentorProfile mentor={this.state.my_mentor} mentorPhoto={this.state.my_mentor_photo}/>
		)
	}

	renderMyProfile () {
		return (
			<MyProfile user={this.state.userInfo} userPhoto={this.state.userPhoto} level={this.state.userInfo.level}/>
		)
    }
    
    renderMenteeDashboard() {
        return (
            <MenteeDashboard userInfo={this.state.userInfo} email={this.state.email} showGiveKudos={true}/>
        )
	}
	
	renderAdminPortal() {
		return (
			<AdminPortal/>
		)
	}

	renderPeers() {
		return (
			<Peers grade={this.state.userInfo.grade}/>
		)
	}

	renderMentorDashboard() {
		return (
			<MentorDashboard userInfo={this.state.userInfo} email={this.state.email}/>
		)
	}

	renderAllMentors() {
		return (
			<AllMentors/>
		)
	}

	renderMyMentees() {
		return (
			<MyMentees email={this.state.email}/>
		)
	}

	renderBody () {
		if (this.state.currentPage === 'mentorProfile') {
			return this.renderMentorProfile();
		}

		if (this.state.currentPage === 'myProfile') {
			return this.renderMyProfile();
		}

		if (this.state.currentPage === 'adminPortal') {
			return this.renderAdminPortal();
		}

		if (this.state.currentPage === 'menteeDashboard') {
			return this.renderMenteeDashboard();
		}	

		if (this.state.currentPage === 'peers') {
			return this.renderPeers();
		}

		if (this.state.currentPage === 'dashboard') {
			return this.renderMentorDashboard();
		}

		if (this.state.currentPage === 'allMentors') {
			return this.renderAllMentors();
		}

		if (this.state.currentPage === 'myMentees') {
			return this.renderMyMentees();
		}
	}

	renderNav () {
		if (this.state.level === 'mentee') {
			return (
				<Navigation handleNavClick={this.handleNavChange.bind(this)} links={this.state.menteeLinks} profilePhoto={this.state.userPhoto}/>
			)
		} else if (this.state.level === 'admin') {
			return (
				<Navigation handleNavClick={this.handleNavChange.bind(this)} links={this.state.adminLinks} profilePhoto={this.state.userPhoto}/>
			)
		} else if (this.state.level === 'mentor') {
			return (
				<Navigation handleNavClick={this.handleNavChange.bind(this)} links={this.state.mentorLinks} profilePhoto={this.state.userPhoto}/>
			)
			
		}
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


Mentee.propTypes = {
	handleNavClick: PropTypes.func,
	links: PropTypes.array.isRequired,
	mentor: PropTypes.object
};

export default Mentee;