import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../CommonComponents/Sidebar.jsx';
import ProfileCard from '../CommonComponents/ProfileCard.jsx';

const MyProfile = (props) => {
	let { user } = props;
	let userFields = [
		{
			label: 'First Name',
			value: user.first_name
		},
		{
			label: 'Last Name',
			value: user.last_name
		},
		{
			label: 'Sex',
			value: user.sex
		},
		{
			label: 'Hometown',
			value: user.hometown
		},
		{
			label: 'School',
			value: user.school
		},
		{
			label: 'Grade',
			value: user.grade
		},
		{
			label: 'Email',
			value: user.email
		},
		{
			label: 'Phone',
			value: user.phone_number
		}
	];

	let parentsFields = [
		{
			label: 'Parent 1 Name',
			value: user.parent1_name
		},
		{
			label: 'Parent 1 Phone',
			value: user.parent1_phone
		},
		{
			label: 'Parent 1 Email',
			value: user.parent1_email
		},
		{
			label: 'Parent 2 Name',
			value: user.parent2_name
		},
		{
			label: 'Parent 2 Phone',
			value: user.parent2_phone
		},
		{
			label: 'Parent 2 Email',
			value: user.parent2_email
		}
	];

	return (
		<div className="page-container row">
			<Sidebar profilePhoto={user.photo} />
			<div className="column">
				<ProfileCard title={'My Profile'} fields={userFields} buttons={[]} />
				<ProfileCard title={'Parents Information'} fields={parentsFields} buttons={[]} />
			</div>
		</div>
	)
}


export default MyProfile
