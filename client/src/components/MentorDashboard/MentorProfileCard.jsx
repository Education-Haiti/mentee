import React from 'react';

class MentorProfileCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mentorContactLinks: [],
            //showKudos: '1', // when 0 don't show kudos. when 1, show       
        }
    }

    componentDidMount() {
        this.setupTopMentorObj();
    }
 
    setupTopMentorObj () {
        let tempContactLinks = [];
        if (this.props.topMentor.email !=="") {
            let linkObj = {
                value: this.props.topMentor.email,
                img: "https://s3.amazonaws.com/educationhaiti/gmail.png",
                class: "not-active"
            }
            tempContactLinks.push(linkObj);
        }

        if (this.props.topMentor.linked_in_page !== "") {
            let linkObj = {
                value: this.props.topMentor.linked_in_page,
                img: "https://s3.amazonaws.com/educationhaiti/linkedin.png",
                class: "",
                
            }
            tempContactLinks.push(linkObj);
        }

        this.setState({ mentorContactLinks: tempContactLinks });
    }

    render () {
        return (
            <div>
              <div className="mentor-d-profile-card-container column">
                <img className="mentor-d-profile-card-photo" src="https://s3.amazonaws.com/educationhaiti/jp_vertil.png"/>
                <div className="mentor-d-profile-card-name">
                    {this.props.topMentor.full_name}
                </div>

                <div className="mentor-d-profile-details">
                    <div> {this.props.topMentor.undergraduate_school} </div>
                    <div> {this.props.topMentor.employer}</div>
                    <div> {this.props.topMentor.current_city} {this.props.topMentor.current_state} </div>
                </div>

                <div className="mentor-d-profile-kudos column">
                    {this.props.topMentor.number_kudos_received} Kudos
                </div>

                <div className="mentor-links-container">
                    {/* <img src="https://s3.amazonaws.com/educationhaiti/gmail.png" className="mentor-links-icon"/>
                    <img src="https://s3.amazonaws.com/educationhaiti/linkedin.png" className="mentor-links-icon"/>
                    <img src="https://s3.amazonaws.com/educationhaiti/slack.png" className="mentor-links-icon"/>
                    <img src="https://s3.amazonaws.com/educationhaiti/facebook2.png" className="mentor-links-icon"/>
                    <img src="https://s3.amazonaws.com/educationhaiti/twitter2.png" className="mentor-links-icon"/> */}
                    {
                        this.state.mentorContactLinks.map((mentorContact, index) => {
                            return (
                                <a href={mentorContact.value} target="_blank" rel="noopener noreferrer" className={mentorContact.class}>
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