import React from 'react';
import axios from 'axios';
import SECRETS from '../../client_secrets.js';
import DetailedMenteeCard from './DetailedMenteeCard.jsx';
import MyProfile from '../MyProfile/MyProfile.jsx';
import MenteeDashboard from '../MenteeDashboard/MenteeDashboard.jsx';


class MyMentees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myMentees : [],
            allMentors: [],
            menteesT: [],
            mentees1: [],
            mentees2: [],
            mentees3: [],
            mentorsByEmail: {},
            displayPhotos: {},
            slackHandles: {},
            mentorEmail: '',
            showMenteeProfile: false,
            showMenteeDashboard: false,
            selectedMentee: {},
            selectedMenteePhoto: {}
        }
    }

    componentDidMount () {
        this.setState({ mentorEmail: this.props.email }, () => {
            // get mentees for current mentor
            this.identifyMyMentees(this.state.mentorEmail);
            console.log('current mentor email is: ', this.state.mentorEmail);
        })
        this.initializeDisplayPhotosAndHandlesObj();
        this.getMenteesByGrade('T');
        this.getMenteesByGrade('1');
        this.getMenteesByGrade('2');
        this.getMenteesByGrade('3');
        this.getAllMentors();
    }

    getAllMentors () {
        axios.get('/users/allmentors')
        .then((response) => {
            //console.log('all mentors: ', response.data);
            let tempObj = {};
            let dataArray = response.data;

            for (let i = 0; i < dataArray.length; i++) {
                tempObj[dataArray[i].email] = dataArray[i].full_name;
            }

            this.setState({ mentorsByEmail: tempObj })
        })
        .catch((error) => {
            console.log('Axios error in getting all mentors');
        })
    }

    identifyMyMentees(theEmail) { 
		axios.get(`/users/mymentees/${theEmail}`)
			.then((response) => {
				//console.log('testingdo', response.data);
				this.setState({ myMentees: response.data });
			})
			.catch((error) => {
				console.log('Axios error in getting authed mentee info : ', error);
			});
    }
    
    toggleMenteeInfo(type, userInfo, userPhoto) { // type 1 --> mentee personal info  | type 2 --> mentee dashboard
        if (type === 1) {
            if (this.state.showMenteeProfile === false) {
                this.setState({ selectedMentee: userInfo }, () => {
                    this.setState({ selectedMenteePhoto: userPhoto }, () => {
                        this.setState({ showMenteeProfile: true });
                    })
                })
                
            } else {
                this.setState({showMenteeProfile: false});
            }
        } else if (type === 2) {
            if (this.state.showMenteeDashboard === false) {
                this.setState({ selectedMentee: userInfo }, () => {
                    this.setState({ showMenteeDashboard: true })
                });
            } else {
                this.setState({ showMenteeDashboard: false });
            }
        }

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

    renderBody () {
        if (this.state.showMenteeProfile === false && this.state.showMenteeDashboard === false) {
            return (
                <div className="mymentees-container column">
                <div className="mentor-d-title column">
                    MY MENTEES 
                </div>

                <div className="peers-line-container">
                    {
                        this.state.myMentees.map((peer, index) => {
                            return (
                                <DetailedMenteeCard className="all-mentors-line-container" key={index} mentee={peer} displayPhoto={this.state.displayPhotos[peer.email]} slackHandle={this.state.slackHandles[peer.email]} myMentor={this.state.mentorsByEmail[peer.my_mentor_email]} onClick={this.toggleMenteeInfo.bind(this)}/>
                            )
                        })
                    }
               </div>

                <div className="mentor-d-title column">
                    TERMINALE
                </div>

                <div className="peers-line-container">
                    {
                        this.state.menteesT.map((peer, index) => {
                            return (
                                <DetailedMenteeCard className="all-mentors-line-container" key={index} mentee={peer} displayPhoto={this.state.displayPhotos[peer.email]} slackHandle={this.state.slackHandles[peer.email]} myMentor={this.state.mentorsByEmail[peer.my_mentor_email]} onClick={this.toggleMenteeInfo.bind(this)}/>
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
                                <DetailedMenteeCard className="all-mentors-line-container" key={index} mentee={peer} displayPhoto={this.state.displayPhotos[peer.email]} slackHandle={this.state.slackHandles[peer.email]} myMentor={this.state.mentorsByEmail[peer.my_mentor_email]} onClick={this.toggleMenteeInfo.bind(this)}/>
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
                                <DetailedMenteeCard className="all-mentors-line-container" key={index} mentee={peer} displayPhoto={this.state.displayPhotos[peer.email]} slackHandle={this.state.slackHandles[peer.email]} myMentor={this.state.mentorsByEmail[peer.my_mentor_email]} onClick={this.toggleMenteeInfo.bind(this)}/>
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
                                <DetailedMenteeCard className="all-mentors-line-container" key={index} mentee={peer} displayPhoto={this.state.displayPhotos[peer.email]} slackHandle={this.state.slackHandles[peer.email]} myMentor={this.state.mentorsByEmail[peer.my_mentor_email]} onClick={this.toggleMenteeInfo.bind(this)}/>
                            )
                        })
                    }
               </div>  



            </div>
            )
        } else if (this.state.showMenteeProfile === true) {
            return (
                <MyProfile user={this.state.selectedMentee} userPhoto={this.state.selectedMenteePhoto}/>
            )
        } else if (this.state.showMenteeDashboard === true) {
            return (
                <MenteeDashboard userInfo={this.state.selectedMentee} email={this.state.selectedMentee.email} mentorEmail={this.state.mentorEmail} showGiveKudos={false}/>
            )
        }
    }

    render () {
        var content = this.renderBody();
        return (
           <div>
               {content}
           </div>
        )
    }
}

export default MyMentees;