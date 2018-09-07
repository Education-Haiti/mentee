import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = (props) => {
<<<<<<< HEAD
	//let { profilePhoto } = props;
	return (
		<div className="sidebar">
			<img className="profile-photo-holder" src={props.profilePhoto}/>
=======
	let { photo } = props;
	return (
		<div className="sidebar">
			<div className="profile-photo-holder"></div>
>>>>>>> bdbbdb6b22c57b0e188d24789e2e3b8fb75711e8
		</div>
	)
}

<<<<<<< HEAD
// Sidebar.propTypes = {
// 	profilePhoto: PropTypes.string.isRequired
// }

export default Sidebar;
=======
Sidebar.propTypes = {
	profilePhoto: PropTypes.string.isRequired
}

export default Sidebar;
>>>>>>> bdbbdb6b22c57b0e188d24789e2e3b8fb75711e8
