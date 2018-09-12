import React from 'react';

class GiveWarning extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showGiveWarningButton: true,
            warningMessage: '',
        }
    }

    toggleWarning () {
        if (this.state.showGiveWarningButton === true) {
            this.setState({ showGiveWarningButton: false });
        } else {
            this.setState({ showGiveWarningButton: true });
        }
    }

    retrieveWarning (e) {
        //console.log(e.target.value);
        this.setState({ warningMessage: e.target.value });
    }

    submitWarning () {
        console.log('the warning is: ', this.state.warningMessage);
        if (this.state.warningMessage === '') {
            alert('Please enter a warning.');
        } else {
            this.toggleWarning();
            alert('Warning submitted.');
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
                    <input className="give-warning-input" onChange={this.retrieveWarning.bind(this)}/>
                    <div>
                        <button className="give-warning-button" onClick={this.submitWarning.bind(this)}> Submit </button>
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