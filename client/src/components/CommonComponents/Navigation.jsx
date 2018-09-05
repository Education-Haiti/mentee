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
			<div className="logo">Logo</div>
			<div className="navigation">
				{rows}
			</div>
		</div>
	)

}

Navigation.propTypes = {
  links: PropTypes.array.isRequired,
  handleNavClick: PropTypes.func
};

export default Navigation;
