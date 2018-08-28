import React from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';

class MenteeHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		this.getAuthedUserInfo();
	}

	getAuthedUserInfo() {
		const slackCodeRaw = window.location.search;
		const slackCode = slackCodeRaw.slice(7);
		console.log('Here it is!', slackCode);


	}

	render() {
		/*const MenteeHome = () => (
	      <div>
	        <Switch>
	          <Route exact path='/' component={Home}/>
	          <Route path='/list' component={List}/>
	        </Switch>
	      </div>
    	)*/
	    return (
	      <div>
	        I am da mentee react component!!
	      </div>
	    );
  	  }
	
}

export default MenteeHome;