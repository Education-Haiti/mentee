import React from 'react';

class MentorProfileCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mentorPhoto: '',
            mentorName: '',
            mentorUndergrad: '',
            mentorGrad: '',
            mentorCity: '',
            mentorEmployer: '',
            mentorFB: '',
            mentorTwitter: '',
            mentorLinkedIn: '',
            mentorEmail: '',
            mentorPhone: '',
            mentorKudos: '',
            showKudos: '1', // when 0 don't show kudos. when 1, show       
        }
    }

    render () {
        return (
            <div>
              <div className="mentor-d-profile-card-container column">
                <img className="mentor-d-profile-card-photo" src="https://s3.amazonaws.com/educationhaiti/jp_vertil.png"/>
                <div className="mentor-d-profile-card-name">
                    Jean-Pierre Vertil
                </div>

                <div className="mentor-d-profile-details">
                    <div> Notre Dame </div>
                    <div> Sigora Group</div>
                    <div> Charlottesville, VA </div>
                </div>

                <div className="mentor-d-profile-kudos column">
                    20 Kudos
                </div>

                <div className="mentor-links-container">
                    <img src="https://s3.amazonaws.com/educationhaiti/gmail.png" className="mentor-links-icon"/>
                    <img src="https://s3.amazonaws.com/educationhaiti/linkedin.png" className="mentor-links-icon"/>
                    <img src="https://s3.amazonaws.com/educationhaiti/slack.png" className="mentor-links-icon"/>
                    <img src="https://s3.amazonaws.com/educationhaiti/facebook2.png" className="mentor-links-icon"/>
                    <img src="https://s3.amazonaws.com/educationhaiti/twitter2.png" className="mentor-links-icon"/>
                </div>

              </div>
            </div>
        )
    }
}

export default MentorProfileCard;