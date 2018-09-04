import React from 'react';
import axios from 'axios';

class PropsSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menteeInfo: {}
        }
    }

    render() {
        return (
            <div>
                This is the Props Summary Component!
            </div>
        )
    }
}

export default PropsSummary;