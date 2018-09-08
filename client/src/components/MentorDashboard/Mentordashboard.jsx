import React from 'react';
import axios from 'axios';
import SECRETS from '../../client_secrets.js';
import MentorProfileCard from './MentorProfileCard.jsx';


class MentorDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <MentorProfileCard/>
            </div>
        )
    }
}

export default MentorDashboard;