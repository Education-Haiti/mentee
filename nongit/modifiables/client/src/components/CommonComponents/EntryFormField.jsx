import React from 'react';
import PropType from 'prop-types';

const EntryFormField = (props) => {

	let {
		field,
		label, 
		value,
		placeholder,
		changeHandler
	} = props;

	return (
		<div className="profile-card-entry row ">
			<label className="profile-card-label">
				{ label }
			</label>
			<input 
				className="profile-card-field" 
				onChange={(e) => changeHandler(field, e.target.value)}
				value={value}
				placeholder={placeholder}
			/>
		</div>
	)
}

export default EntryFormField;
