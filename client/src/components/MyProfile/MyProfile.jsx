import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../CommonComponents/Sidebar.jsx';
import ProfileCard from '../CommonComponents/ProfileCard.jsx';
import EntryForm from '../CommonComponents/EntryForm.jsx';

class MyProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userFields: [],
			parentsFields: [],
			currentView: 'profile',
			user: this.props.user,
		}

		this.parseFields = this.parseFields.bind(this);
		this.handleViewChange = this.handleViewChange.bind(this);
		this.renderProfileCards = this.renderProfileCards.bind(this);
		this.renderEntryForms = this.renderEntryForms.bind(this);
	}

	componentDidMount() {
		let parsedFields = this.parseFields(this.props.user);
		this.setState({
			userFields: parsedFields.user,
			parentsFields: parsedFields.parents
		});
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

	handleViewChange (view) {

		if (view === 'profile') {
		}
		this.setState({
			currentView: view
		})
	}

	renderProfileCards () {
		let buttons = 
		[
			{
				label: 'Edit',
				handler: () => this.handleViewChange('edit')
			}
		]

		return (
			<div className="column">
				<ProfileCard 
					title={'Profile'} 
					fields={this.state.userFields} 
					buttons={buttons}
				/>
				<ProfileCard 
					title={'Parents Information'} 
					fields={this.state.parentsFields} 
					buttons={buttons}
				/>
			</div>
		)
	}

	renderEntryForms () {
		let buttons =
		[
			{
				label: 'Save',
				handler: () => this.handleViewChange('profile')
			}
		]

		return (
			<div className="column">
				<EntryForm
					title={'Edit Information'}
					fields={this.state.userFields}
					buttons={buttons}
					user={this.state.user}
				/>
				<EntryForm
					title={'Edit Parents Information'}
					fields={this.state.parentsFields}
					changeHandler={''}
					buttons={buttons}
					user={this.state.user}
				/>
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
