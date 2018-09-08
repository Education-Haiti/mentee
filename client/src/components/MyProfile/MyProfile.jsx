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
		}

		this.parseFields = this.parseFields.bind(this);
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
				label: 'Full Name',
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


	renderProfileCards () {
		return (
			<div className="column">
				<ProfileCard 
					title={'My Profile'} 
					fields={this.state.userFields} 
					buttons={[]}
				/>
				<ProfileCard 
					title={'Parents Information'} 
					fields={this.state.parentsFields} 
					buttons={[]}
				/>
			</div>
		)
	}

	renderEntryForms () {
		return (
			<div className="column">
				<EntryForm
					title={'Edit My Information'}
					fields={this.state.userFields}
					changeHandler={''}
					buttons={[]}
				/>
				<EntryForm
					title={'Edit Parents Information'}
					fields={this.state.parentsFields}
					changeHandler={''}
					buttons={[]}
				/>
			</div>
		)
	}

	render() {
		let $cards = this.renderEntryForms();

		return (
			<div className="page-container row">
				<Sidebar profilePhoto={this.props.userPhoto} />
				{ $cards }
			</div>
		)
	}	
}


export default MyProfile
