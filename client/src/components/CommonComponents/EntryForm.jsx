import React from 'react';
import EntryFormField from './EntryFormField.jsx';
import PropTypes from 'prop-types';

const EntryForm = (props) => {
	let { title, fields, buttons, changeHandler } = props;

	let $fields = fields.map(({field, label, value}) => (
		<EntryFormField
			field={field}
			label={label}
			value={value}
			changeHandler={changeHandler}
		/>
		)
	)

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

export default EntryForm
