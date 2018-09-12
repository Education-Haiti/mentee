import React from 'react';

class WarningsSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            warnings: []

        }
    }

    componentDidUpdate (prevProps) {
        if (this.props.warnings !== prevProps.warnings) {
            this.setState({ warnings: this.props.warnings });
        }
        
    }

    render () {
        return (
            <div className="warnings-summary-container column">
                <div className="warnings-summary-title">
                    Warnings
                </div>
                {
                    this.state.warnings.map((warning) => {
                        return (
                            <div className="warnings-summary-card">
                                <div className="warnings-summary-card-row warnings-summary-issuer-and-date">
                                    <div> {warning.issuer} </div>
                                    <div> {warning.date} </div>
                                </div>
            
                                <div className="warnings-summary-text">
                                    {warning.warning}
                                </div>
                            </div>
                        )
                    })
                }       
            </div>
        )
    }
}

export default WarningsSummary;