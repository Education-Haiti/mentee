import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../CommonComponents/Sidebar.jsx';
import ProfileCard from '../CommonComponents/ProfileCard.jsx';

const MentorProfile = (props) => {
	let { mentor, mentorPhoto } = props;

	let mentorFields = 
	[
		{
			key: 'full_name',
			label: 'Name',
			value: mentor.full_name
		},		
		{
			key: 'undergraduate_school',
			label: 'Undergrad',
			value: mentor.undergraduate_school
		},
		{
			key: 'graduate_school',
			label: 'Grad School',
			value: mentor.graduate_school
		},
		{
			key: 'majors',
			label: 'Majors',
			value: mentor.majors
		},
		{
			key: 'email',
			label: 'Email',
			value: mentor.email
		},
		{
			key: 'phone_number',
			label: 'Phone',
			value: mentor.phone_number
		}
	]

	return (
		<div className="page-container row">
			<Sidebar 
				profilePhoto={mentorPhoto}
			/>
			<div className="column">
				<ProfileCard 
					title={'My Mentor'} 
					fields={mentorFields} 
					buttons={[]}
				/>
			</div>
		</div>
	)
}

// MentorProfile.propTypes = {
// 	mentor: PropTypes.objectOf(PropTypes.string).isRequired
// }

export default MentorProfile;
