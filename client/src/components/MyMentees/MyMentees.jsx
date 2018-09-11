import React from 'react';
import axios from 'axios';
import SECRETS from '../../client_secrets.js';
import DetailedMenteeCard from './DetailedMenteeCard.jsx';

class MyMentees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myMentees : [],
            menteesT: [],
            mentees1: [],
            mentees2: [],
            mentees3: [],
            mentorsByEmail: {},
            displayPhotos: {},
            slackHandles: {},
            mentorEmail: '',
        }
    }

    componentDidMount () {
        this.setState({ mentorEmail: this.props.email }, () => {
            // get mentees for current mentor
            console.log('current mentor email is: ', this.state.mentorEmail);
        })
        this.initializeDisplayPhotosAndHandlesObj();
        this.getMenteesByGrade('T');
        this.getMenteesByGrade('1');
        this.getMenteesByGrade('2');
        this.getMenteesByGrade('3');


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

    getMenteesByGrade (theGrade) {
        axios.get(`/users/mentees/grade/${theGrade}`)
            .then((response) => {
                if (theGrade === 'T') {
                    this.setState({ menteesT: response.data });
                } else if (theGrade === '1') {
                    this.setState({ mentees1: response.data });
                } else if (theGrade === '2') {
                    this.setState({ mentees2: response.data });
                } else if (theGrade === '3') {
                    this.setState({ mentees3: response.data });
                }     
            })
            .catch((error) => {
                console.log('Axios-error in getting mentees based on grade : ', error);
            })
    }

    render () {
        return (
            <div className="mentor-d-top-container column">
                <div className="mentor-d-title column">
                    MY MENTEES 
                </div>

                <div className="mentor-d-title column">
                    TERMINALE
                </div>

                <div className="peers-line-container">
                    {
                        this.state.menteesT.map((peer, index) => {
                            return (
                                <DetailedMenteeCard className="all-mentors-line-container" key={index} mentee={peer} displayPhoto={this.state.displayPhotos[peer.email]} slackHandle={this.state.slackHandles[peer.email]}/>
                            )
                        })
                    }
               </div>


                <div className="mentor-d-title column">
                    1ere
                </div>

                <div className="peers-line-container">
                    {
                        this.state.mentees1.map((peer, index) => {
                            return (
                                <DetailedMenteeCard className="all-mentors-line-container" key={index} mentee={peer} displayPhoto={this.state.displayPhotos[peer.email]} slackHandle={this.state.slackHandles[peer.email]}/>
                            )
                        })
                    }
               </div>



                <div className="mentor-d-title column">
                    2nd
                </div>

                <div className="peers-line-container">
                    {
                        this.state.mentees2.map((peer, index) => {
                            return (
                                <DetailedMenteeCard className="all-mentors-line-container" key={index} mentee={peer} displayPhoto={this.state.displayPhotos[peer.email]} slackHandle={this.state.slackHandles[peer.email]}/>
                            )
                        })
                    }
               </div>



                <div className="mentor-d-title column">
                    3e
                </div>

                <div className="peers-line-container">
                    {
                        this.state.mentees3.map((peer, index) => {
                            return (
                                <DetailedMenteeCard className="all-mentors-line-container" key={index} mentee={peer} displayPhoto={this.state.displayPhotos[peer.email]} slackHandle={this.state.slackHandles[peer.email]}/>
                            )
                        })
                    }
               </div>  



            </div>
        )
    }
}

export default MyMentees;