import  React from 'react';

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render () {
        return (
            <div className="statistics-container"> 
                <div className="statistics-element-title">
                    Total Mentors
                </div>
                <div>
                    100
                </div>
                    
                <div className="statistics-element-title">
                    Total Mentees
                </div>
                <div>
                    100
                </div>
            
                <div className="statistics-element-title">
                    Mentees 3e
                </div>
                <div>
                    20
                </div>

                <div className="statistics-element-title">
                    Mentees 2nd
                </div>
                <div>
                    30
                </div>

                <div className="statistics-element-title">
                    Mentees 1e
                </div>
                <div>
                    30
                </div>

                <div className="statistics-element-title">
                    Mentees Philo
                </div>
                <div>
                    20
                </div>
            </div>
        )
    }
}

export default Statistics;