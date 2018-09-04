import React from 'react';
import axios from 'axios';

class KudosSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menteeInfo: {}
        }
    }

    render() {
        return (
            <div className="kudos-summary-container">
               <div>
                   Kudos Summary
               </div>

            </div>
        )
    }
}

export default KudosSummary;