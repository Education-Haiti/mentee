import React from 'react';

const Footer = (props) => {
	const { links } = props;

	let $links = links.map (({label, url}) => (
		<a href={url}>{label}</a>
	));

	return (
		<div className="footer row">
			<div className="column links">
				<div>
					Copyright © 2018 Education Haiti. All rights reserved.
				</div>
				<div className="row">
					<a href="/" className="icon facebook"></a>
					<a href="/" className="icon twitter"></a>
				</div>
			</div>
			<div className="column links" >
				<div className="heading">
					PAGES
				</div>
				{ $links }
			</div>
		</div>
	)
}

export default Footer;
