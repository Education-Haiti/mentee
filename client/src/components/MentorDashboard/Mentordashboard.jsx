import React from 'react';
import axios from 'axios';
import SECRETS from '../../client_secrets.js';
import MentorProfileCard from './MentorProfileCard.jsx';
import Statistics from './Statistics.jsx';


class MentorDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
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
                        <MentorProfileCard/>
                        <MentorProfileCard/>
                        <MentorProfileCard/>
                        <MentorProfileCard/>
                        <MentorProfileCard/>
                    </div>
                  
                </div>
                
            </div>
        )
    }
}

export default MentorDashboard;