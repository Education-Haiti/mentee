import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../CommonComponents/Sidebar.jsx';
import ProfileCard from '../CommonComponents/ProfileCard.jsx';

class MyProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userFields: [],
			parentsFields: [],
		}

	}

	componentDidMount() {
		this.setState({ userFields: 
			 [
				{
					label: 'Full Name',
					value: this.props.user.full_name
				},
				{
					label: 'Sex',
					value: this.props.user.sex
				},
				{
					label: 'Hometown',
					value: this.props.user.hometown
				},
				{
					label: 'School',
					value: this.props.user.school
				},
				{
					label: 'Grade',
					value: this.props.user.grade
				},
				{
					label: 'Email',
					value: this.props.user.email
				},
				{
					label: 'Phone',
					value: this.props.user.phone_number
				}
			]	
		});

		this.setState({ parentsFields: 
			 [
				{
					label: 'Parent 1 Name',
					value: this.props.user.parent1_name
				},
				{
					label: 'Parent 1 Phone',
					value: this.props.user.parent1_phone
				},
				{
					label: 'Parent 1 Email',
					value: this.props.user.parent1_email
				},
				{
					label: 'Parent 2 Name',
					value: this.props.user.parent2_name
				},
				{
					label: 'Parent 2 Phone',
					value: this.props.user.parent2_phone
				},
				{
					label: 'Parent 2 Email',
					value: this.props.user.parent2_email
				}
			]
		 });
	}
	
	render() {
		return (
			<div className="page-container row">
				<Sidebar profilePhoto={'user.photo'} />
				<div className="column">
					<ProfileCard title={'My Profile'} fields={this.state.userFields} buttons={[]} />
					<ProfileCard title={'Parents Information'} fields={this.state.parentsFields} buttons={[]} />
				</div>
			</div>
		)
	}	
}


export default MyProfile
