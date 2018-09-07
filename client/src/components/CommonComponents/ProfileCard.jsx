import React from 'react';
import ProfileCardField from './ProfileCardField.jsx';
import PropTypes from 'prop-types';

const ProfileCard = (props) => {
	let { title, fields, buttons } = props;

	let $fields = fields.map(({label, value}) => (
			<ProfileCardField
				label={label} 
				value={value || ''} 
			/>
		)
	);

	let $buttons = buttons.map(({label, handler}) => (
			<button onClick={handler}>{label}</button>
		)
	);

	return (
		<div className="profile-page-body">
			<div className="label">
				{title}
			</div>
			<div className="profile-card-container">
				<div className="profile-card-content column">
					{$fields}
				</div>
			</div>
			<div className="row">
				{$buttons}
			</div>
		</div>
	)
}


<<<<<<< HEAD
export default ProfileCard;
=======
export default ProfileCard;
>>>>>>> bdbbdb6b22c57b0e188d24789e2e3b8fb75711e8
