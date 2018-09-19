import React from 'react';
import axios from 'axios';

class GiveWarning extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            issuer: '',
            showGiveWarningButton: true,
            warningMessage: '',
            warningsReceived: [],
            numberOfWarnings: 0,
            menteeEmail: '',
        }
    }

    componentDidMount() {
        this.setState({ issuer: this.props.issuer });
        this.setState({ warningsReceived: this.props.warningsReceived });
        this.setState({ numberOfWarnings: this.props.numberOfWarnings })
        this.setState({ menteeEmail: this.props.menteeEmail });
    }

    componentDidUpdate(prevProps) {
        if (this.props.issuer !== prevProps.issuer) {
            this.setState({ issuer: this.props.issuer });
        }

        if (this.props.warningsReceived !== prevProps.warningsReceived) {
            this.setState({ warningsReceived: this.props.warningsReceived });
        }

        if (this.props.numberOfWarnings !== prevProps.numberOfWarnings) {
            this.setState({ numberOfWarnings: this.props.numberOfWarnings });
        }

        if (this.props.menteeEmail !== prevProps.menteeEmail) {
            this.setState({ menteeEmail: this.props.menteeEmail });
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
        if (this.state.warningMessage === '') {
            alert('Please enter a warning.');
        } else {
            this.toggleWarning();
            alert('Warning submitted.');

            let date = new Date();
            let formattedDate = date.toLocaleDateString('us-EN', {year: 'numeric', month: 'long', day: 'numeric'});

            let theIssuer = this.state.issuer;
            let theEmail = this.state.menteeEmail;
            let theWarning = this.state.warningMessage;

            let tempGivenWarningsObj = {
                issuer: theIssuer,
                date: formattedDate,
                warning: theWarning
            }

            let warningObj = this.state.warningsReceived;
            let theNewCount = this.state.numberOfWarnings + 1;

            warningObj.push(tempGivenWarningsObj);

            // update state
            this.setState({ warningsReceived: warningObj }, () => {
                this.setState({ warningMessage: '' });
            });

            this.setState({ numberOfWarnings: theNewCount });

            // now update db
            axios.put(`/users/receivedwarnings/${theEmail}/`, {
                warningsReceived: warningObj,
                newCount: theNewCount

            })
            .then((response) => {

            })
            .catch((error) => {
                console.log('Axios error in updating given warnings');
            })

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