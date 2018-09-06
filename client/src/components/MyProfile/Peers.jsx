import React from 'react';
import SECRETS from '../../client_secrets.js';
import axios from 'axios';
class Peers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            peers: [],
            displayPhotos: {},
            grade: ''
        }
    }

    componentDidMount() {
        this.setState({ grade: this.props.grade }, () => {
            this.getPeers();
        })
    }

    getPeers() {
        axios.get(`/users/mentees/grade/${this.state.grade}`)
            .then((response) => {
                this.setState({ peers: response.data });
            })
            .catch((error) => {
                console.log('Axios-error in getting mentees based on grade : ', error);
            })
    }

    render () {
        return (
            <div className="peers-line-container">
                {
                    this.state.peers.map((peer, index) => {
                        return (
                            <div className="peers-container">
                                <img className="peers-photo" src="https://s3.amazonaws.com/educationhaiti/mat_pierre.png"/>
                                <div className="peers-name"> {peer.full_name} </div>
                                <div className="peers-description"> 
                                      <div> {peer.hometown} </div>
                                      <div> {peer.school} </div>
                                      <div> Slack </div>
                                </div>
                            </div>
                        )
                            
                    })
                }		
                    {/* <div className="peers-container">
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

                    </div> */}
			</div>
        )
    }
}

export default Peers;

