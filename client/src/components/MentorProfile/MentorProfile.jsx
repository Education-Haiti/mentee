import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../CommonComponents/Sidebar.jsx';
import ProfileCard from '../CommonComponents/ProfileCard.jsx';

class MentorProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fields : []
		}
	}

	componentDidMount() {
		console.log('DA MENTOR: ', this.props.mentor);
		this.setState({ fields: 
		[
			{
				label: 'Name',
				value: this.props.mentor.full_name
			},		
			{
				label: 'Undergrad',
				value: this.props.mentor.undergraduate_school
			},
			{
				label: 'Grad School',
				value: this.props.mentor.graduate_school
			},
			{
				label: 'Majors',
				value: this.props.mentor.majors
			},
			{
				label: 'Email',
				value: this.props.mentor.email
			},
			{
				label: 'Phone',
				value: this.props.mentor.phone_number
			}
		] })
	}
	
	 

	render () {
		return (
			<div className="page-container row">
				<Sidebar profilePhoto={this.props.mentorPhoto}/>
				<ProfileCard title={'My Mentor'} fields={this.state.fields} buttons={[]}/>
			</div>
		)
	}
}

// MentorProfile.propTypes = {
// 	mentor: PropTypes.objectOf(PropTypes.string).isRequired
// }

export default MentorProfile;
