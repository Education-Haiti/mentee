import React from 'react';
import EntryFormField from './EntryFormField.jsx';
import PropTypes from 'prop-types';

class EntryForm extends React.Component {
	constructor (props) {
		super (props);
		this.state = {
			full_name: this.props.user.full_name,
			sex: this.props.user.sex,
			hometown: this.props.user.hometown,
			school: this.props.user.school,
			grade: this.props.user.grade,
			email: this.props.user.email,
			phone_number: this.props.user.phone_number,
			parent1_name: this.props.user.parent1_name,
			parent1_phone: this.props.user.parent1_phone,
			parent1_email: this.props.user.parent1_email,
			parent2_name: this.props.user.parent2_name,
			parent2_phone: this.props.user.parent2_phone,
			parent2_email: this.props.user.parent2_email,
			current_city: this.props.user.current_city,
			current_state: this.props.user.current_state,
			current_country: this.props.user.current_country,
			undergraduate_school: this.props.user.undergraduate_school,
			graduate_school: this.props.user.graduate_school,
			majors: this.props.user.majors,
			linked_in_page: this.props.user.linked_in_page,
			facebook_page: this.props.user.facebook_page,
			twitter_page: this.props.user.twitter_page

		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	componentDidMount() {
		
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
				onClick={()=>handler('profile', this.state)}
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
