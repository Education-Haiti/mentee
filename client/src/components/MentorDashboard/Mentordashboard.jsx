import React from 'react';
import axios from 'axios';
import SECRETS from '../../client_secrets.js';
import MentorProfileCard from './MentorProfileCard.jsx';
import Statistics from './Statistics.jsx';
import GiveKudos from '../CommonComponents/GiveKudos.jsx';
import KudosSummary from '../CommonComponents/KudosSummary.jsx';


class MentorDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topFiveMentors: [],
            allUsers: [],
            mentorInfo: {},
            email: '',
            displayPhotos: {},
            slackHandles: {}
        }
    }

    componentDidMount() {
        this.getTopFiveMentors();
        this.initializeDisplayPhotosAndHandlesObj();
        this.setState({ mentorInfo: this.props.userInfo }, () => {
            this.setState({ email: this.props.email });
        });
       
    }

    getTopFiveMentors () {
        axios.get('/users/topfive/mentors')
        .then((response) => {
            console.log('Top five mentors: ', response.data);
            this.setState({ topFiveMentors: response.data });
        })
        .catch((error) => {
            console.log('Axios error in getting top 5 mentors');
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

                this.setState({ displayPhotos: tempObj }, () => {
                    this.setState({ slackHandles: tempHandles }, () => {
                        this.getAllUsers();
                    });
                    
                });
                
				
            })
            .catch((error) => {
                console.log('Axios error in getting all users from SLACK API : ', error);
            })
    }

    getAllUsers() {
        axios.get('/users')
            .then((response) => {
                //console.log('All users: ', response);
                this.setState({ allUsers: response.data }, () => {
                    console.log('allllluuuseerrrss: ', this.state.allUsers);
                });
            })
            .catch((error) => {
                console.log('Axios error in retrieving users', error);
            })
    }

    render() {
        return (
            <div className="mentor-d-container">
                <div className="mentor-d-statistics-container">
                    <div className="mentor-d-statistics-title">
                        Statistics
                    </div>


                    <div className="mentor-d-leftmost-container">
                        <Statistics/>
                        <GiveKudos className="column" userInfo={this.state.mentorInfo} email={this.state.email} usernames={this.state.slackHandles} allUsers={this.state.allUsers}/>
                    </div>
                   
                     
                </div>

                <div className="mentor-d-top-container column">
                    <div className="mentor-d-title column">
                        TOP FIVE MENTORS
                    </div>
                      <div className="mentor-d-rightmost-container"> 
                            <div className="mentor-d-top-mentors-row-container">
                                    {
                                        this.state.topFiveMentors.map((theTopMentor, index) => {
                                            return (
                                                <MentorProfileCard topMentor={theTopMentor} displayPhoto={ this.state.displayPhotos[theTopMentor.email] } slackHandle = { this.state.slackHandles[theTopMentor.email] }/>
                                            )
                                        })
                                    }
                            </div>

                            <div className="column">
                                <KudosSummary userInfo={this.state.mentorInfo} displayPhotos={this.state.displayPhotos}/>
                            </div>
                      </div>
                </div>
                
            </div>
        )
    }
}

export default MentorDashboard;