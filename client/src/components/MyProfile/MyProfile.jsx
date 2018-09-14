import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../CommonComponents/Sidebar.jsx';
import ProfileCard from '../CommonComponents/ProfileCard.jsx';
import EntryForm from '../CommonComponents/EntryForm.jsx';
import axios from 'axios';

class MyProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userFields: [],
			parentsFields: [],
			mentorFields: [],
			currentView: 'profile',
			user: this.props.user,
			full_name: this.props.user.full_name,
			level: this.props.level,
		}

		this.parseFields = this.parseFields.bind(this);
		this.parseMentorFields = this.parseMentorFields.bind(this);
		this.handleViewChange = this.handleViewChange.bind(this);
		this.renderProfileCards = this.renderProfileCards.bind(this);
		this.renderEntryForms = this.renderEntryForms.bind(this);
	}

	componentDidMount() {
		console.log('the level is:: ', this.props.level);
		if (this.props.level === 'mentee') {
			let parsedFields = this.parseFields(this.state.user);
			this.setState({
				userFields: parsedFields.user,
				parentsFields: parsedFields.parents
			});
		} else if (this.props.level === 'mentor') {
			let parsedFields = this.parseMentorFields(this.state.user);
			this.setState({
				mentorFields: parsedFields.mentor,
			}, () => {
				console.log('da mentorFields: ', this.state.mentorFields);
			});
		}
		
	}

	parseMentorFields (user) {
		let mentorFields = 
		[
			{
				key: 'full_name',
				label: 'Name',
				value: user.full_name
			},
			{
				key: 'sex',
				label: 'Sex',
				value: user.sex
			},
			{
				key: 'current_city',
				label: 'Current City',
				value: user.current_city
			},
			{
				key: 'current_state',
				label: 'Current State',
				value: user.current_state
			},
			{
				key: 'current_country',
				label: 'Current Country',
				value: user.current_country
			},
			{
				key: 'email',
				label: 'Email',
				value: user.email
			},
			{
				key: 'school',
				label: 'Highschool (Haiti)',
				value: user.school
			},
			{
				key: 'phone_number',
				label: 'Phone',
				value: user.phone_number
			},
			{
				key: 'undergraduate_school',
				label: 'Undergrad',
				value: user.undergraduate_school
			},
			{
				key: 'graduate_school',
				label: 'Grad School',
				value: user.graduate_school
			},
			{
				key: 'majors',
				label: 'Majors',
				value: user.majors
			},
			{
				key: 'linked_in_page',
				label: 'LinkedIn Link',
				value: user.linked_in_page
			},
			{
				key: 'facebook_page',
				label: 'Facebook Link',
				value: user.facebook_page
			},
			{
				key: 'twitter_page',
				label: 'Twitter Link',
				value: user.twitter_page
			},	
			
		]

		return { mentor: mentorFields }
	}

	
	
	parseFields (user) {
		let userFields =  
		[
			{
				key: 'full_name',
				label: 'Name',
				value: user.full_name
			},
			{
				key: 'sex',
				label: 'Sex',
				value: user.sex
			},
			{
				key: 'hometown',
				label: 'Hometown',
				value: user.hometown
			},
			{
				key: 'school',
				label: 'School',
				value: user.school
			},
			{
				key: 'grade',
				label: 'Grade',
				value: user.grade
			},
			{
				key: 'email',
				label: 'Email',
				value: user.email
			},
			{
				key: 'phone_number',
				label: 'Phone',
				value: user.phone_number
			}
		];

		let parentsFields =
		[
			{
				key: 'parent1_name',
				label: 'Parent 1 Name',
				value: user.parent1_name
			},
			{
				key: 'parent1_phone',
				label: 'Parent 1 Phone',
				value: user.parent1_phone
			},
			{
				key: 'parent1_email',
				label: 'Parent 1 Email',
				value: user.parent1_email
			},
			{
				key: 'parent2_name',
				label: 'Parent 2 Name',
				value: user.parent2_name
			},
			{
				key: 'parent2_phone',
				label: 'Parent 2 Phone',
				value: user.parent2_phone
			},
			{
				key: 'parent2_email',
				label: 'Parent 2 Email',
				value: user.parent2_email
			}
		];

		return { user: userFields, parents: parentsFields }
	}

	getNewData(theEmail) {
		axios.get(`/users/authed/${theEmail}`)
			.then((response) => {
				if (this.props.level === 'mentee') {
					let parsedFields = this.parseFields(response.data[0]);
					this.setState({
						user: response.data[0],
						userFields: parsedFields.user,
						parentsFields: parsedFields.parents
					});
				} else if (this.state.level === 'mentor') {
					let parsedFields = this.parseMentorFields(response.data[0]);
					this.setState({
						user: response.data[0],
						mentorFields: parsedFields.mentor,
					});
				}		
			})
			.catch((error) => {
				console.log('Error in getting updated mentee info : ', error);
			})
	}

	handleViewChange (view, updatedDataObj) {

		if (view === 'profile') {
			this.sendToDb(updatedDataObj);
		}
		this.setState({
			currentView: view
		})
	}

	sendToDb (newUserInfo) {
		//console.log('here is the updated info', newMenteeInfo);
		if (this.props.level === 'mentee') {
			axios.put(`/users/menteeinfo/${this.props.user.email}`, {
				newMenteeInfo: newUserInfo
			})
			.then((response) => {
				this.getNewData(newUserInfo.email);
			})
			.catch((error) => {
				console.log('Axios error in updating mentee info: ', error);
			})
		} else if (this.props.level === 'mentor') {
			axios.put(`/users/mentorinfo/${this.props.user.email}`, {
				newMentorInfo: newUserInfo
			})
			.then((response) => {
				this.getNewData(newUserInfo.email);
			})
			.catch((error) => {
				console.log('Axios error in updating mentee info: ', error);
			})
		}
		

	}

	renderProfileCards () {
		let buttons = 
		[
			{
				label: 'Edit',
				handler: () => this.handleViewChange('edit')
			}
		]

		let menteeProfileCard = null;
		let parentProfileCard = null; 
		let mentorProfileCard = null;

		if (this.props.level === 'mentee') {
			menteeProfileCard = (
				<ProfileCard 
					title={'Profile'} 
					fields={this.state.userFields} 
					buttons={buttons}
				/>
			);

			parentProfileCard = (
				<ProfileCard 
					title={'Parents Information'} 
					fields={this.state.parentsFields} 
					buttons={buttons}
				/>
			);
		} else if (this.props.level === 'mentor') {
			mentorProfileCard = (
				<ProfileCard 
					title={'Information'} 
					fields={this.state.mentorFields} 
					buttons={buttons}
				/>
			);
		}

		return (
			<div className="column">
				{menteeProfileCard}
				{parentProfileCard}
				{mentorProfileCard}
			</div>
		)
	}

	renderEntryForms () {
		let buttons =
		[
			{
				label: 'Save',
				//handler: () => this.handleViewChange('profile')
				handler: this.handleViewChange
			}
		]

		let menteeEntryForm = null;
		let parentEntryForm = null; 
		let mentorEntryForm = null; 

		if (this.props.level === 'mentee') {
			menteeEntryForm = (
				<EntryForm
					title={'Edit Information'}
					fields={this.state.userFields}
					buttons={buttons}
					user={this.state.user}
				/>
			);

			parentEntryForm = (
				<EntryForm
					title={'Edit Parents Information'}
					fields={this.state.parentsFields}
					changeHandler={''}
					buttons={buttons}
					user={this.state.user}
				/>
			)
		} else if (this.props.level === 'mentor') {
			mentorEntryForm = (
				<EntryForm
				title={'Edit Information'}
				fields={this.state.mentorFields}
				changeHandler={''}
				buttons={buttons}
				user={this.state.user}
			/>
			)
		}

		return (
			<div className="column">
				{menteeEntryForm}
				{parentEntryForm}
				{mentorEntryForm}
			</div>
		)
	}

	render() {
		let $cards = this.state.currentView === 'profile'? this.renderProfileCards():this.renderEntryForms();

		return (
			<div className="page-container row">
				<Sidebar profilePhoto={this.props.userPhoto} />
				{ $cards }
			</div>
		)
	}	
}


export default MyProfile
