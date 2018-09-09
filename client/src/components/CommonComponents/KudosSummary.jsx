import React from 'react';
import axios from 'axios';
import SECRETS from '../../client_secrets.js'


class KudosSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menteeInfo: {}, // not necessary
            kuddosReceived: [],
            kuddosGiven: [], 
            displayPhotos: {},
            showKudosReceived: true, 
            kudosCardsBackgrounds: [
                'kudos-background-1',
                'kudos-background-2',
                'kudos-background-3',
                'kudos-background-4',
                'kudos-background-5',
            ]
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.userInfo !== prevProps.userInfo) {
            this.setState({ menteeInfo: this.props.userInfo });
            this.setState({ kuddosReceived: this.props.userInfo.kudos_received });
            this.setState({ kuddosGiven: this.props.userInfo.kudos_given });
            this.setState({ displayPhotos: this.props.displayPhotos });
        }
    }

    // initializeDisplayPhotosObj() {
    //     axios.get(`https://slack.com/api/users.list?token=${SECRETS.BOT_TOKEN}`)
	// 		.then((response) => {
    //             console.log('All users from slack !!!! : ', response.data.members);
    //             // make an object whose key is the email of all users and value is the url to their photos
    //             let tempObj = {};
    //             let dataArray = response.data.members;
    //             for (let i = 0; i < dataArray.length; i++) {
    //                 tempObj[dataArray[i].profile.email] = dataArray[i].profile.image_512; 
    //             }

    //             this.setState({ displayPhotos: tempObj });
				
    //         })
    //         .catch((error) => {
    //             console.log('Axios error in getting all users from SLACK API : ', error);
    //         })
    // }

    handleShowKudosGiven() {
        this.setState({ showKudosReceived: false });
    }

    handleShowKudosReceived() {
        this.setState({ showKudosReceived: true });
    }

    render() {
        let kuddosReceived = null;
        let kuddosGiven = null; 

        if (this.state.showKudosReceived === true) {
            kuddosReceived = 
            <div>
               <div className="kudos-summary-top-container">
                 <div className="kudos-summary-title"> 
                   {this.state.kuddosReceived.length}  Kudos Received
                 </div>

                 <button className="kudos-switch-button" onClick={this.handleShowKudosGiven.bind(this)}>
                     See Kudos Given
                 </button>
                  
               </div>

               {
                   this.state.kuddosReceived.map((kudo, index) => {
                       return (
                        <div className={`kudos-card-container ${this.state.kudosCardsBackgrounds[Math.floor(Math.random() * (5))]}`} key={index}>
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
        } else {
            kuddosGiven = 
            <div>
               <div className="kudos-summary-top-container">
                 <div className="kudos-summary-title"> 
                   {this.state.kuddosGiven.length}  Kudos Given
                 </div>

                 <button className="kudos-switch-button" onClick={this.handleShowKudosReceived.bind(this)}>
                     See Kudos Received
                 </button>
                  
               </div>

               {
                   this.state.kuddosGiven.map((kudo, index) => {
                       return (
                        <div  className={`kudos-card-container ${this.state.kudosCardsBackgrounds[Math.floor(Math.random() * (5))]}`} key={index}>
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
        }
        return (
            <div className="kudos-summary-container">
                {kuddosGiven}
                {kuddosReceived}

            </div>
        )
    }
}

export default KudosSummary;