import React from 'react';
<<<<<<< HEAD
import axios from 'axios';
import SECRETS from '../../client_secrets.js'
import { Route, Switch } from 'react-router-dom';
import Checklist from './Checklist.jsx';
import GiveKudos from './GiveKudos.jsx';
import KudosSummary from './KudosSummary.jsx';
import '../../../dist/styles.css';
import CircularProgressbar from 'react-circular-progressbar';

class MenteeDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menteeInfo: {},
			email: '',
			percentComplete: 0
		}
	}

	 componentDidMount() {
	// 	//this.getAuthedUserInfo();
	 	this.setState({ menteeInfo: this.props.userInfo });
	 	this.setState({ email: this.props.email });
		
	 }

	// componentWillReceiveProps(prevProps) {
	// 	if (this.props.email !== prevProps.email) {
	// 		this.setState({ email: this.props.email });
	// 		console.log('hhh', this.state.email);
	// 		console.log('aaa', this.state.menteeInfo);
	// 	}

	// 	if (this.props.menteeInfo !== prevProps.menteeInfo) {
	// 		this.setState({ menteeInfo: this.props.userInfo });
	// 	}
	// }

	calculatePercentCompleteness(items) {
        let totalItems = Object.keys(items).length;
        let amountCompleted = 0; 

        for (var key in items) {
            if (items[key] === true) {
                amountCompleted++;
            }
		}
		let percentComp = Math.floor((amountCompleted/totalItems)*100);
		this.setState({ percentComplete: percentComp});
    }

	identifyMentee(theEmail) { // identifying mentee on database NO LONGER NEEDED HERE !!!
		axios.get(`/users/authed/${theEmail}`)
			.then((response) => {
				//console.log(response.data);
				this.setState({ menteeInfo: response.data[0] });
			})
			.catch((error) => {
				console.log('Axios error in getting authed mentee info : ', error);
			});
	}

	getAuthedUserInfo() { // NO LONGER NEEDED HERE !!!!!!!!
		const slackCodeRaw = window.location.search;
		const slackCode = slackCodeRaw.slice(7); // to remove the key of 'slack=' specified on the server side
		
		axios.get('https://slack.com/api/oauth.access', {
			params: {
				code: slackCode,
				client_id: SECRETS.CLIENT_ID,
				client_secret: SECRETS.CLIENT_SECRET,
			}
		})
		.then((response) => {
			console.log('Email is ... : ', response.data.user.email);
			this.setState({ email: response.data.user.email});
			this.identifyMentee(response.data.user.email);
		})
		.catch((error)=> {
			console.log('Axios error in getting authed user info !! : ', error); });
	}

	render() {
	    return (
	       <div>
			<div className="menteeHomeMainContainer">
				<Checklist calcCompleteness={this.calculatePercentCompleteness.bind(this)} email={this.state.email}/>
				<KudosSummary menteeInfo={this.state.menteeInfo}/>
				<div className="mentee-rightmost-vertical-container">
				  <GiveKudos menteeInfo={this.state.menteeInfo} email={this.state.email}/>
				  <CircularProgressbar percentage={this.state.percentComplete} text={`${this.state.percentComplete}%`} />
				</div>	
			</div>
	      </div>
	    );
  	  }
}

export default MenteeDashboard;
=======

const MenteeDashBoard = (props) => {
	return (
		<div> dis is da dashboard</div>
	)
}

export default MenteeDashBoard;
>>>>>>> bdbbdb6b22c57b0e188d24789e2e3b8fb75711e8
