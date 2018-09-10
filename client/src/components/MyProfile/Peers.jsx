import React from 'react';
import SECRETS from '../../client_secrets.js';
import axios from 'axios';
import MenteeProfileCard from '../CommonComponents/MenteeProfileCard.jsx';

class Peers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            peers: [],
            completeness: [],
            displayPhotos: {},
            slackHandles: {},
            grade: ''
        }
    }

    componentDidMount() {
        this.setState({ grade: this.props.grade }, () => {
            this.getPeers();
            this.initializeDisplayPhotosAndHandlesObj();
        })
    }

    getPeers() {
        axios.get(`/users/mentees/grade/${this.state.grade}`)
            .then((response) => {
                this.setState({ peers: response.data });
            })
            .catch((error) => {
                console.log('Axios-error in getting mentees based on grade : ', error);
            })
    }

    initializeDisplayPhotosAndHandlesObj() {
        axios.get(`https://slack.com/api/users.list?token=${SECRETS.BOT_TOKEN}`)
			.then((response) => {
                console.log('All users from slack !!!! : ', response.data.members);
                // make an object whose key is the email of all users and value is the url to their photos
                let tempObj = {};
                let tempHandles = {};
                let dataArray = response.data.members;
                for (let i = 0; i < dataArray.length; i++) {
                    tempObj[dataArray[i].profile.email] = dataArray[i].profile.image_512; 
                    tempHandles[dataArray[i].profile.email] = dataArray[i].name;
                }

                this.setState({ displayPhotos: tempObj });
                this.setState({ slackHandles: tempHandles });
				
            })
            .catch((error) => {
                console.log('Axios error in getting all users from SLACK API : ', error);
            })
    }

    render () {
        return (
            <div className="peers-line-container">
                {/* {
                    this.state.peers.map((peer, index) => {
                        return (
                            <div className="peers-container">
                                <img className="peers-photo" src={this.state.displayPhotos[peer.email]}/>
                                <div className="peers-name"> {peer.full_name} </div>
                                <div className="peers-description"> 
                                      <div> {peer.hometown} </div>
                                      <div> {peer.school} </div>
                                      <div> @{this.state.slackHandles[peer.email]} </div>
                                </div>
                            </div>
                        )       
                    })
                }	
               */}
               {
                   this.state.peers.map((peer, index) => {
                       return (
                           <MenteeProfileCard className="all-mentors-line-container" key={index} mentee={peer} displayPhoto={this.state.displayPhotos[peer.email]} slackHandle={this.state.slackHandles[peer.email]}/>
                       )
                   })
               }
			</div>
        )
    }
}

export default Peers;

