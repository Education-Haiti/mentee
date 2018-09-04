import React from 'react';
import axios from 'axios';

class KudosSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menteeInfo: {}
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.menteeInfo !== prevProps.menteeInfo) {
            this.setState({ menteeInfo: this.props.menteeInfo }, () => {
                console.log('mentee info here:: ', this.state.menteeInfo);
            })
        }
    }

    render() {
        return (
            <div className="kudos-summary-container">
               <div className="kudos-summary-title">
                   Kudos Received
               </div>

               <div className="kudos-card-container">
                   <img src="https://avatars.slack-edge.com/2018-09-04/428709791669_35ffa81775a6f45afe6c_512.jpg" className="kudos-card-photo"/>

                   <div className="kudos-text-container">
                     <div className="kudos-card-name">
                       Anaise Bruno
                     </div>

                     <div className="kudos-description">
                     I would like to thank Christina Bastien for having helped me study for the SAT. Her help was very valuable to my growth and I am forever grateful. 
                     </div>

                   </div>

                   <div className="kudos-date">
                    09/04/2018
                   </div>

               </div>

               <div className="kudos-card-container">

               </div>

               <div className="kudos-card-container">

               </div>

            </div>
        )
    }
}

export default KudosSummary;