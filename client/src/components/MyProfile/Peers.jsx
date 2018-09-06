import React from 'react';
import SECRETS from '../../client_secrets.js';

class Peers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            peers: {},
            displayPhotos: {},
        }
    }

    render () {
        return (
            <div className="peers-line-container">		
                    <div className="peers-container">
                        <img className="peers-photo" src="https://s3.amazonaws.com/educationhaiti/mat_pierre.png"/>
                        <div className="peers-name"> Peer Name </div>
                        <div className="peers-description"> 
                            <div> Hometown </div>
                            <div> School </div>
                            <div> Slack </div>
                        </div>

                    </div>

                     <div className="peers-container">
                        <img className="peers-photo" src="https://s3.amazonaws.com/educationhaiti/mat_pierre.png"/>
                        <div className="peers-name"> Peer Name </div>
                        <div className="peers-description"> 
                            <div> Hometown </div>
                            <div> School </div>
                            <div> Slack </div>
                        </div>

                    </div>

                     <div className="peers-container">
                        <img className="peers-photo" src="https://s3.amazonaws.com/educationhaiti/mat_pierre.png"/>
                        <div className="peers-name"> Peer Name </div>
                        <div className="peers-description"> 
                            <div> Hometown </div>
                            <div> School </div>
                            <div> Slack </div>
                        </div>

                    </div>
			</div>
        )
    }
}

export default Peers;

