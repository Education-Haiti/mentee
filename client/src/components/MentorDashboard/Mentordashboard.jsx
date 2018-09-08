import React from 'react';
import axios from 'axios';
import SECRETS from '../../client_secrets.js';
import MentorProfileCard from './MentorProfileCard.jsx';
import Statistics from './Statistics.jsx';


class MentorDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topFiveMentors: [],
        }
    }

    componentDidMount() {
        this.getTopFiveMentors();
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

    render() {
        return (
            <div className="mentor-d-container">
                <div className="mentor-d-statistics-container">
                    <div className="mentor-d-statistics-title">
                        Statistics
                    </div>

                    <Statistics/>
                    
                </div>

                <div className="mentor-d-top-container column">
                    <div className="mentor-d-title column">
                        TOP FIVE MENTORS
                    </div>
                    <div className="mentor-d-top-mentors-row-container">
                        {
                            this.state.topFiveMentors.map((theTopMentor, index) => {
                                return (
                                    <MentorProfileCard topMentor={theTopMentor}/>
                                )
                            })
                        }
                    </div>
                  
                </div>
                
            </div>
        )
    }
}

export default MentorDashboard;