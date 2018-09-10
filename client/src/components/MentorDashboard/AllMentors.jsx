import React from 'react';
import axios from 'axios';
import SECRETS from '../../client_secrets.js';
import MentorProfileCard from './MentorProfileCard.jsx';

class AllMentors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allMentors: [],
            displayPhotos: {},
            slackHandles: {}
        }
    }

    componentDidMount() {
        this.initializeDisplayPhotosAndHandlesObj();
    }

    initializeDisplayPhotosAndHandlesObj() {
        axios.get(`https://slack.com/api/users.list?token=${SECRETS.BOT_TOKEN}`)
			.then((response) => {
                //console.log('All users from slack !!!! : ', response.data.members);
                // make an object whose key is the email of all users and value is the url to their photos
                let tempObj = {};
                let tempHandles = {};
                let dataArray = response.data.members;
                for (let i = 0; i < dataArray.length; i++) {
                    tempObj[dataArray[i].profile.email] = dataArray[i].profile.image_512; 
                    tempHandles[dataArray[i].profile.email] = dataArray[i].name;
                }

                this.setState({ displayPhotos: tempObj }, () => {
                    this.setState({ slackHandles: tempHandles }, () => {
                        this.getAllMentors();
                    });
                    
                });
                
				
            })
            .catch((error) => {
                console.log('Axios error in getting all users from SLACK API : ', error);
            })
    }

    getAllMentors () {
        axios.get('/users/allmentors')
        .then((response) => {
            //console.log('all mentors: ', response.data);
            this.setState({ allMentors: response.data });
        })
        .catch((error) => {
            console.log('Axios error in getting all mentors');
        })
    }

    render () {
        return (
            <div>
                <div className="mentor-d-top-container column">
                    <div className="mentor-d-title column">
                        ALL MENTORS
                    </div>

                    <div className="all-mentors-line-container"> 
                        {
                            this.state.allMentors.map((theMentor, index) => {
                                return (
                                    <MentorProfileCard key={index} mentor={theMentor} displayPhoto={ this.state.displayPhotos[theMentor.email] } slackHandle = { this.state.slackHandles[theMentor.email] }/>
                                )
                            })
                        }
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default AllMentors;