import React from 'react';
import axios from 'axios';
import SECRETS from './client_secrets.js'


class KudosSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menteeInfo: {},
            kuddosReceived: [],
            kuddosGiven: [], 
            displayPhotos: {}
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.menteeInfo !== prevProps.menteeInfo) {
            this.setState({ menteeInfo: this.props.menteeInfo }, () => {
                this.initializeDisplayPhotosObj();
            });
            this.setState({ kuddosReceived: this.props.menteeInfo.kudos_received });
            
        }
    }

    initializeDisplayPhotosObj() {
        axios.get(`https://slack.com/api/users.list?token=${SECRETS.BOT_TOKEN}`)
			.then((response) => {
                console.log('All users from slack !!!! : ', response.data.members);
                // make an object whose key is the email of all users and value is the url to their photos
                let tempObj = {};
                let dataArray = response.data.members;
                for (let i = 0; i < dataArray.length; i++) {
                    tempObj[dataArray[i].profile.email] = dataArray[i].profile.image_512; 
                }

                this.setState({ displayPhotos: tempObj });
				
            })
            .catch((error) => {
                console.log('Axios error in getting all users from SLACK API : ', error);
            })

    }

    render() {
        return (
            <div className="kudos-summary-container">
               <div className="kudos-summary-title">
                   Kudos Received
               </div>

               {
                   this.state.kuddosReceived.map((kudo, index) => {
                       return (
                        <div className="kudos-card-container" key={index}>
                            <img className="kudos-card-photo" src={this.state.displayPhotos[kudo.email]}/>

                            <div className="kudos-text-container">
                                <div className="kudos-card-name">
                                {kudo.name}
                                </div>

                                <div className="kudos-description">
                                {kudo.message}
                                </div>

                            </div>

                            <div className="kudos-date">
                                {kudo.date}
                            </div>

                        </div>
                       )
                        
                   })
               }
            </div>
        )
    }
}

export default KudosSummary;