import React from 'react';
import EntryFormField from './EntryFormField.jsx';
import PropTypes from 'prop-types';

class EntryForm extends React.Component {
	constructor (props) {
		super (props);
		this.state = {

		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	handleChange (field, value) {
		this.setState({
			[field]: value
		}, () => console.log(this.state))
	}

	handleSave () {
		//send state to DB
		console.log(this.state);
	}

	render () {
		let { title, fields, buttons, changeHandler } = this.props;
		let $fields = fields.map(({key, label,value}) => (
			<EntryFormField
				field={key}
				label={label}
				value={this.state[key]}
				placeholder={value}
				changeHandler={this.handleChange}
			/>
			)
		)

		let $buttons = buttons.map(({label, handler}) => (
			<button 
				className="profile-card-button"
				onClick={()=>handler(this.state)}
			>
				{label}
			</button>
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
					<div className="row">
						{$buttons}
					</div>
				</div>
			</div>
		)
	}

	
}

export default EntryForm
