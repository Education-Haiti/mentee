import React from 'react';
import EntryFormField from './EntryFormField.jsx';
import PropTypes from 'prop-types';

class EntryForm extends React.Component {
	constructor (props) {
		super (props);
		this.state = {
			full_name: '',
			sex: '',
			hometown: '',
			school: '',
			grade: '',
			email: '',
			phone_number: '',
			parent1_name: '',
			parent1_phone: '',
			parent1_email: '',
			parent2_name: '',
			parent2_phone: '',
			parent2_email: '',
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	componentDidMount() {
		this.setState({ full_name: this.props.user.full_name });
		this.setState({ sex: this.props.user.sex });
		this.setState({ hometown: this.props.user.hometown });
		this.setState({ school: this.props.user.school });
		this.setState({ grade: this.props.user.grade });
		this.setState({ email: this.props.user.email });
		this.setState({ phone_number: this.props.user.phone_number });
		this.setState({ parent1_name: this.props.user.parent1_name });
		this.setState({ parent1_phone: this.props.user.parent2_phone });
		this.setState({ parent1_email: this.props.user.parent2_email });
		this.setState({ parent2_name: this.props.user.parent2_name });
		this.setState({ parent2_phone: this.props.user.parent2_phone });
		this.setState({ parent2_email: this.props.user.parent2_email });
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
