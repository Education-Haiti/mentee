import React from 'react';
import axios from 'axios';
import SECRETS from '../../client_secrets.js';

class MyMentees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myMentees : [],
            mentees3: [],
            mentees2: [],
            mentees1: [],
            menteesT: [],
        }
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

                <div className="mentor-d-title column">
                    1ere
                </div>

                <div className="mentor-d-title column">
                    2nd
                </div>

                <div className="mentor-d-title column">
                    3e
                </div>

            </div>
        )
    }
}

export default MyMentees;