import  React from 'react';
import axios from 'axios';
class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: {},
            totalMentors : 0,
            totalMentees: 0,
            mentees3: 0,
            mentees2: 0,
            mentees1: 0,
            menteesT: 0
        }
    }

    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers() {
        axios.get('/users')
            .then((response) => {
                console.log('hhhhhhhhh: ', response);
                this.setState({ allUsers: response.data });
            })
            .catch((error) => {
                console.log('Axios-sise error in retrieving users', error);
            })
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