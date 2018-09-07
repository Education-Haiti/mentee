import React from 'react';
import PropTypes from 'prop-types';

import Navigation from './CommonComponents/Navigation.jsx';
import MenteeDashboard from './MenteeDashboard/MenteeDashboard.jsx';
import MentorProfile from './MentorProfile/MentorProfile.jsx';
import MyProfile from  './MyProfile/MyProfile.jsx';

class Mentee extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 'myProfile'
		}
	}

	renderDashboard () {
		return (
			<MenteeDashboard />
		)
	}

	renderMentorProfile () {
		return (
			<MentorProfile mentor={this.props.mentor} />
		)
	}

	renderMyProfile () {
		return (
			<MyProfile user={this.props.user} />
		)
	}

	renderBody () {
		if (this.state.currentPage === 'mentorProfile') {
			return this.renderMentorProfile();
		}

		if (this.state.currentPage === 'myProfile') {
			return this.renderMyProfile();
		}

		return this.renderMenteeDashboard();
	}


	render() {
		var content = this.renderBody();

		return (
			<div className="mentee-page">
				<Navigation links={this.props.links}/>
				<div className="mentee-body-container column">
					<div className="top-padding"></div>
						{content}
				</div>
			</div>
		)
	}
}


Mentee.propTypes = {
	handleNavClick: PropTypes.func,
	links: PropTypes.array.isRequired,
	mentor: PropTypes.object
};

export default Mentee;