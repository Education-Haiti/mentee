import React from 'react';
import PropType from 'prop-types';

const ProfileCardField = (props) => {

	let {
		label,
		value
	} = props;

	return (
		<div className="profile-card-entry row">
			<label className="profile-card-label">
				{ label }
			</label>
			<div className="profile-card-field">
					{ value }
				</div>
		</div>
	)
}

ProfileCardField.propType = {
	label: PropType.string.isRequired,
	value: PropType.string
}

export default ProfileCardField
