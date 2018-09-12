import React from 'react';

class WarningsSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            warnings: [
                {
                    "issuer": "Koneyy Phamm",
                    "date": "9/11/2018",
                    "warning": "For consistently missing deadlines and showing no interest in the program"
                },
                {
                    "issuer": "JP Vertil",
                    "date": "9/11/2018",
                    "warning": "For not being engaged"
                },
                {
                    "issuer": "Jules Walter",
                    "date": "9/11/2018",
                    "warning": "For not responding to my emails"
                }
            ]

        }
    }

    render () {
        return (
            <div className="warnings-summary-container column">
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