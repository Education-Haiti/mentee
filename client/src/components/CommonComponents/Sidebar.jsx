import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = (props) => {
	let { photo } = props;
	return (
		<div className="sidebar">
			<div className="profile-photo-holder"></div>
		</div>
	)
}

Sidebar.propTypes = {
	profilePhoto: PropTypes.string.isRequired
}

export default Sidebar;
