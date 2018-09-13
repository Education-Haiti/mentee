import React from 'react';

class MenteeProfileCard extends React.Component {
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

                <div className="mentor-d-profile-details">
                    <div> {this.props.mentee.hometown} </div>
                    <div> {this.props.mentee.school}</div>
                    <div> @{this.props.slackHandle}  </div>
                </div>

                <div className="mentor-d-profile-kudos column">
                    {this.props.mentee.number_kudos_received} Kudos
                </div>

              </div>
            </div>
        )
    }

}

export default MenteeProfileCard;