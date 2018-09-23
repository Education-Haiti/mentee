import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = (props) => {
	//let { profilePhoto } = props;
	return (
		<div className="sidebar">
			<img className="profile-photo-holder" src={props.profilePhoto || 'https://s3.amazonaws.com/educationhaiti/pending.png' }/>
		</div>
	)
}

// Sidebar.propTypes = {
// 	profilePhoto: PropTypes.string.isRequired
// }

export default Sidebar;
