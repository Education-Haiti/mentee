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

<<<<<<< HEAD
export default ProfileCardField
=======
export default ProfileCardField
>>>>>>> bdbbdb6b22c57b0e188d24789e2e3b8fb75711e8
