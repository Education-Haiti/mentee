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
                //console.log('All users: ', response);
                this.setState({ allUsers: response.data }, () => {
                    this.calculateStatistics();
                });
            })
            .catch((error) => {
                console.log('Axios error in retrieving users', error);
            })
    }

    calculateStatistics() {
        let allUsers = this.state.allUsers;
        let totalMentors = 0; 
        let totalMentees = 0; 
        let mentees3 = 0; 
        let mentees2 = 0; 
        let mentees1 = 0; 
        let menteesT = 0;

        for (let i = 0; i < allUsers.length; i++) {
            let currentUser = allUsers[i];
            if (allUsers[i].level === "mentor" || currentUser.level === "admin") {
                totalMentors += 1;
            } else {
                totalMentees += 1;
                if (currentUser.grade === "3") {
                    mentees3 += 1;
                } else if (currentUser.grade === "2") {
                    mentees2 +=1;
                } else if (currentUser.grade === "1") {
                    mentees1 += 1;
                } else if (currentUser.grade === "t") {
                    menteesT += 1;
                }
            }
        }

        this.setState({ totalMentors: totalMentors });
        this.setState({ totalMentees: totalMentees });
        this.setState({ mentees3: mentees3 });
        this.setState({ mentees2: mentees2 });
        this.setState({ mentees1: mentees1 });
        this.setState({ menteesT: menteesT });
    }

    render () {
        return (
            <div className="statistics-container"> 
                <div className="statistics-element-title">
                    Total Mentors
                </div>
                <div>
                    {this.state.totalMentors}
                </div>
                    
                <div className="statistics-element-title">
                    Total Mentees
                </div>
                <div>
                    {this.state.totalMentees}
                </div>
            
                <div className="statistics-element-title">
                    Mentees 3e
                </div>
                <div>
                   {this.state.mentees3}
                </div>

                <div className="statistics-element-title">
                    Mentees 2nd
                </div>
                <div>
                    {this.state.mentees2}
                </div>

                <div className="statistics-element-title">
                    Mentees 1e
                </div>
                <div>
                    {this.state.mentees1}
                </div>

                <div className="statistics-element-title">
                    Mentees Philo
                </div>
                <div>
                    {this.state.menteesT}
                </div>
            </div>
        )
    }
}

export default Statistics;