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
            <div>
                THIS IS THE MY MENTEES COMPONENT RENDERING !!!
            </div>
        )
    }
}

export default MyMentees;