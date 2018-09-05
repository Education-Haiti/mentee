import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../CommonComponents/Sidebar.jsx';
import ProfileCard from '../CommonComponents/ProfileCard.jsx';

const MentorProfile = (props) => {
	let { mentor } = props;
	let fields = [
		{
			label: 'First Name',
			value: mentor.first_name
		},		
		{
			label: 'Last Name',
			value: mentor.last_name
		},
		{
			label: 'Major',
			value: mentor.field_of_study
		},
		{
			label: 'School',
			value: mentor.university
		},
		{
			label: 'Email',
			value: mentor.email
		},
		{
			label: 'Phone',
			value: mentor.phone
		}
	];

	return (
		<div className="page-container row">
			<Sidebar profilePhoto={mentor.photo}/>
			<ProfileCard title={'My Mentor'} fields={fields} buttons={[]}/>
		</div>
	)
}

MentorProfile.propTypes = {
	mentor: PropTypes.objectOf(PropTypes.string).isRequired
}

export default MentorProfile;