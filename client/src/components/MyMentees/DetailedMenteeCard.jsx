import React from 'react';

class DetailedMenteeCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {     
    }


    render () {

        return (
            <div>
              <div className="mentor-d-profile-card-container column">
                <img className="mentor-d-profile-card-photo" src={this.props.displayPhoto}/>
                <div className="mentor-d-profile-card-name">
                    {this.props.mentee.full_name}
                </div>

                <div className="mentee-d-profile-mentor-name">
                    Mentor: {this.props.myMentor}
                </div>

                <div className="mentor-d-profile-details">
                    <div> {this.props.mentee.hometown} </div>
                    <div> {this.props.mentee.school}</div>
                    <div> @{this.props.slackHandle}  </div>
                </div>

                <div className="mentor-d-profile-kudos column">
                    {this.props.mentee.number_kudos_received} Kudos
                </div>

                <div className="mentor-links-container">
                <img  className="mentee-links-icon" src={'https://s3.amazonaws.com/educationhaiti/dashboard.png'}   />
                <img  className="mentee-links-icon" src={'https://s3.amazonaws.com/educationhaiti/user.png'}   />
                </div>

              </div>
            </div>
        )
    }

}

export default DetailedMenteeCard;