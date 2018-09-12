import React from 'react';

class GiveWarning extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showGiveWarningButton: true,
        }
    }

    toggleWarning () {
        if (this.state.showGiveWarningButton === true) {
            this.setState({ showGiveWarningButton: false });
        } else {
            this.setState({ showGiveWarningButton: true });
        }
    }

    render () {
        let giveWarningButton = null; 
        let giveWarningBody = null;

        if (this.state.showGiveWarningButton === true) {
            giveWarningButton = (
                <button className="give-warning-button" onClick={this.toggleWarning.bind(this)}>
                    GIVE WARNING
                </button>
            )
        } else if (this.state.showGiveWarningButton === false) {
            giveWarningBody = (
                <div>
                    <input className="give-warning-input"/>
                    <div>
                        <button className="give-warning-button"> Submit </button>
                        <button className="give-warning-button" onClick={this.toggleWarning.bind(this)}> Cancel </button>
                    </div>
                </div>
            )
        }
        return (
            <div className="give-warning-container">
                {giveWarningButton}
                {giveWarningBody}
            </div>
        )
    }
}

export default GiveWarning;