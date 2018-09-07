import React from 'react';
import PropTypes from 'prop-types';

const Navigation = (props) => {
	const {links, handleNavClick} = props;

	let rows = links.map (({label}) => (
		<button 
			className={"nav-button "} 
			onClick={() => handleNavClick(label)}
		>
			{label}
		</button>
	));

	return (
		<div className="header row">
<<<<<<< HEAD
			<img className="nav-logo"  src="https://s3.amazonaws.com/educationhaiti/education_haiti_logo.png"/>
			<div className="navigation">
				{rows}
			</div>
			<img className="nav-profile-photo" src={props.profilePhoto}/>
=======
			<div className="logo">Logo</div>
			<div className="navigation">
				{rows}
			</div>
>>>>>>> bdbbdb6b22c57b0e188d24789e2e3b8fb75711e8
		</div>
	)

}

Navigation.propTypes = {
  links: PropTypes.array.isRequired,
  handleNavClick: PropTypes.func
};

<<<<<<< HEAD
export default Navigation;
=======
export default Navigation;
>>>>>>> bdbbdb6b22c57b0e188d24789e2e3b8fb75711e8
