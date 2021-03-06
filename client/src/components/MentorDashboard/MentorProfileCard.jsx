import React from 'react';
import SECRETS from '../../client_secrets.js';
import axios from 'axios';

class MentorProfileCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mentorContactLinks: [],
            mentorContactStatics: [],
            displayPhoto: '',
            slackHandle: '',
            email: '',
            phone: '',
            showEmail: false,
            showSlack: false,
            showPhone: false,
            //showKudos: '1', // when 0 don't show kudos. when 1, show       
        }
    }

    componentDidMount() {
        this.setState({ email: this.props.mentor.email }, () => {
            this.setState({ displayPhoto: this.props.displayPhoto });
            this.setState({ slackHandle: "@" + this.props.slackHandle });
            this.setState({ phone: this.props.mentor.phone_number });
            this.setupMentorObj();
        })
        
    }

    setupMentorObj () {
        let tempContactLinks = [];
        let tempContactStatics = [];
        console.log('debugging: ', this.props.mentor);
        if (this.props.mentor.email) {
            let staticObj = {
                value: this.props.mentor.email,
                img: "https://s3.amazonaws.com/educationhaiti/gmail.png",
                type: "email",

            }
            tempContactStatics.push(staticObj);
        }

        if (this.props.slackHandle) {
            let staticObj = {
                value: this.props.slackHandle,
                img: "https://s3.amazonaws.com/educationhaiti/slack.png",
                type: "slack",

            }
            tempContactStatics.push(staticObj);
        }

        if (this.props.mentor.phone_number) {
            let staticObj = {
                value: this.props.mentor.phone_number,
                img: "https://s3.amazonaws.com/educationhaiti/phone.png",
                type: "phone",

            }
            tempContactStatics.push(staticObj);
        }


        if (this.props.mentor.linked_in_page) {
            let linkObj = {
                value: this.props.mentor.linked_in_page,
                img: "https://s3.amazonaws.com/educationhaiti/linkedin.png",
                
                
            }
            tempContactLinks.push(linkObj);
        }

        if (this.props.mentor.facebook_page) {
            let linkObj = {
                value: this.props.mentor.facebook_page,
                img: "https://s3.amazonaws.com/educationhaiti/facebook2.png"
            }
            tempContactLinks.push(linkObj);
        }

        if (this.props.mentor.twitter_page) {
            let linkObj = {
                value: this.props.mentor.twitter_page,
                img: "https://s3.amazonaws.com/educationhaiti/twitter2.png"
            }
           tempContactLinks.push(linkObj);
        }

        this.setState({ mentorContactLinks: tempContactLinks });
        this.setState({ mentorContactStatics: tempContactStatics });
    }


    toggleEmail () {
        if (this.state.showEmail === false) {
            this.setState({ showEmail: true });
        } else {
            this.setState({ showEmail: false });
        }
    }

    toggleSlack () {
        if (this.state.showSlack === false) {
            this.setState({ showSlack: true });
        } else {
            this.setState({ showSlack: false });
        }
    }

    togglePhone () {
        if (this.state.showPhone === false) {
            this.setState({ showPhone: true });
        } else {
            this.setState({ showPhone: false });
        }
    }

    toggleStatics (type) {
        if (type === "email") {
            this.toggleEmail();
        } else if (type === "slack") {
            this.toggleSlack();
        } else if (type === "phone") {
            this.togglePhone();
        }
    }

    render () {
        let email = null; 
        let slack = null;
        let phone = null;

        if (this.state.showEmail === true) {
            email = (
                <div className="static-contact">
                    {this.state.email}
                </div>
            )
        }

        if (this.state.showSlack === true) {
            slack = (
                <div className="static-contact">
                    {this.state.slackHandle}
                </div>
            )
        }

        if (this.state.showPhone === true) {
            phone = (
                <div className="not-active static-contact">
                 <a href="">
                    {this.state.phone}
                 </a>
                    
                </div>
            )
        }

        return (
            <div>
              <div className="mentor-d-profile-card-container column">
                <img className="mentor-d-profile-card-photo" src={this.state.displayPhoto}/>
                <div className="mentor-d-profile-card-name">
                    {this.props.mentor.full_name}
                </div>

                <div className="mentor-d-profile-details">
                    <div> {this.props.mentor.undergraduate_school} </div>
                    <div> {this.props.mentor.employer}</div>
                    <div> {this.props.mentor.current_city} {this.props.mentor.current_state} </div>
                </div>

                <div className="mentor-d-profile-kudos column">
                    {this.props.mentor.number_kudos_received} Kudos
                </div>

                {email}
                {slack}
                {phone}

                <div className="mentor-links-container">               
                    {
                        this.state.mentorContactStatics.map((mentorStatic, index) => {
                            return (
                                <img key={mentorStatic.value} className="mentor-links-icon" src={mentorStatic.img}
                                onClick={() => this.toggleStatics(mentorStatic.type)}  />
                            )
                        })
                    }
                    
                    {
                        this.state.mentorContactLinks.map((mentorContact, index) => {
                            return (
                                <a key={mentorContact.value} href={mentorContact.value} target="_blank" rel="noopener noreferrer" className={mentorContact.class}>
					                <img className="mentor-links-icon" src={mentorContact.img}/>
					            </a>
                            )
                        })
                    }
                    

                </div>

              </div>
            </div>
        )
    }
}

export default MentorProfileCard;