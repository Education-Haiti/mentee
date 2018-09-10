import React from 'react';
import axios from 'axios';

class AllMentors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allMentors: [],
        }
    }

    render () {
        return (
            <div>
                This is the  ALL MENTORS COMPONENT RENDERING !
            </div>
        )
    }
}

export default AllMentors;