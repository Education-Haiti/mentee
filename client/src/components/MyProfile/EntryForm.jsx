import React from 'react';

class EntryForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.entries;

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit () {
		console.log(this.state);
	}

	handleChange (key, value) {
		this.setState({
			[key]: value
		})
	}

	renderInputField (label, key) {
		return (
			<label>
				{label}
				<input 
					type="text" 
					value={this.state[key]} 
					onChange={(e) => this.handleChange(key, e.target.value)} 
				/>
			</label>
		)
	}

	render () {
		let {
			firstName, 
			lastName,
			email, 
			hometown, 
			school, 
			phone, 
		}

		return (
			<div>
				<div className="title">
					<form onSubmit={this.handleSubmit}>
						<label>
							First Name:
							<input type="text" value={th} />
						</label>
					</form>
				</div>
			</div>

		)
	}
}