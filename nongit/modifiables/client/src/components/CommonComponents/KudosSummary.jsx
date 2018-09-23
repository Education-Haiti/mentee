import React from 'react';
import axios from 'axios';
import SECRETS from '../../client_secrets.js'


class KudosSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kuddosReceived: [], // not necessary
            kuddosGiven: [], // not necessary
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
            this.setState({ kuddosReceived: this.props.userInfo.kudos_received });
            this.setState({ kuddosGiven: this.props.userInfo.kudos_given });
        }

        if (this.props.displayPhotos !== prevProps.displayPhotos) {
            this.setState({ displayPhotos: this.props.displayPhotos });
        }
    }

    handleShowKudosGiven() {
        this.setState({ showKudosReceived: false });
    }

    handleShowKudosReceived() {
        this.setState({ showKudosReceived: true });
    }

    render() {
        let kuddosReceived = null;
        let kuddosReceivedArray = this.props.userInfo.kudos_received || this.state.kuddosReceived;
        let kuddosGiven = null; 
        let kuddosGivenArray = this.props.userInfo.kudos_given || this.state.kuddosGiven;

        if (this.state.showKudosReceived === true) {
            kuddosReceived = 
            <div>
               <div className="kudos-summary-top-container">
                 <div className="kudos-summary-title"> 
                   {kuddosReceivedArray.length}  Kudos Received
                 </div>

                 <button className="kudos-switch-button" onClick={this.handleShowKudosGiven.bind(this)}>
                     See Kudos Given
                 </button>
                  
               </div>

               {
                   kuddosReceivedArray.map((kudo, index) => {
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
                   {kuddosGivenArray.length}  Kudos Given
                 </div>

                 <button className="kudos-switch-button" onClick={this.handleShowKudosReceived.bind(this)}>
                     See Kudos Received
                 </button>
                  
               </div>

               {
                   kuddosGivenArray.map((kudo, index) => {
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