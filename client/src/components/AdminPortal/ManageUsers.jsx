import React from 'react';
import axios from 'axios';

class ManageUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddMenteeView: false,
            showAddMentorView: false, 
            showDeleteUserView: false, 
            addMenteeFullName: '',
            addMenteeEmail: '',
            addMenteesMentorEmail: '',
            addMenteeLevel: '3',
            addMentorFullName: '',
            addMentorEmail: '',
            addMentorLevel: 'Mentor',
            deleteUserEmail: '',
        }
    }

    retrieveInfo (info) {
        var theName = info.target.name;
        var theValue = info.target.value;
        this.state[theName] = theValue;
    }

    retrieveMenteeLevel (e) {
        this.setState({ addMenteeLevel: e.target.value });
    }

    retrieveMentorLevel (e) {
        this.setState({ addMentorLevel: e.target.value });
    }

    addMentee () {
        if (this.state.addMenteeFullName === '') {
            alert('Please add a name for the new mentee :) ');
        } else if (this.state.addMenteeEmail === '') {
            alert('Please add an email for the new mentee :) ');
        } else if (this.state.addMenteesMentorEmail === '') {
            alert('Please add an email for the new mentor :) ');
        } else {
            let theChecklist = {};
            if (this.state.addMenteeLevel === '3') {
                theChecklist = {
                    "Introduced self to mentor": false,
                    "Mentor talked to parents": false,
                    "Read Education Haiti manual": false,
                    "Mentor approved extra-curricular plans": false,
                }
            } else if (this.state.addMenteeLevel === '2') {
                theChecklist = {
                    "Introduced self to mentor": false,
                    "Mentor talked to parents": false,
                    "Read Education Haiti manual": false,
                    "Mentor approved extra-curricular plans": false,
                    "Purchased TOEFL book": false,
                    "Picked major": false,
                    "Picked universities": false,
                    "Listed universities requirements": false,
                }
            } else if (this.state.addMenteeLevel === '1') {
                theChecklist = {
                    "Introduced self to mentor": false,
                    "Mentor talked to parents": false,
                    "Read Education Haiti manual": false,
                    "Mentor approved extra-curricular plans": false,
                    "Purchased TOEFL book": false,
                    "Picked major": false,
                    "Picked universities": false,
                    "Listed universities requirements": false,
                    "Passed the TOEFL": false,
                    "Scheduled SAT 1": false,
                    "Passed SAT 1": false,
                    "Picked subjects for SAT 2": false,
                    "Purchased SAT 2 books": false
                }
            } else if (this.state.addMenteeLevel === 'T') {
                theChecklist = {
                    "Introduced self to mentor": false,
                    "Mentor talked to parents": false,
                    "Read Education Haiti manual:": false,
                    "Mentor approved extra-curricular plans": false,
                    "Purchased TOEFL book": false,
                    "Picked major": false,
                    "Picked universities": false,
                    "Listed universities requirements": false,
                    "Passed the TOEFL": false,
                    "Scheduled SAT 1": false,
                    "Passed SAT 1": false,
                    "Picked subjects for SAT 2": false,
                    "Purchased SAT 2 books": false,
                    "Created a Common Application account": false,
                    "Passed SAT 2": false,
                    "Identified references": false,
                    "Submitted reference letters": false,
                    "Made outline for essays": false,
                    "Completed essays": false,
                    "Submitted all applications": false
                }
            }
            
            axios.post('/users/new', {
                user: {
                    full_name: this.state.addMenteeFullName,
                    email: this.state.addMenteeEmail,
                    grade: this.state.addMenteeLevel,
                    my_mentor_email: this.state.addMenteesMentorEmail,
                    sex: '',
                    hometown: '',
                    school: '',
                    phone_number: '',
                    parent1_name: '',
                    parent1_phone: '',
                    parent1_email: '',
                    parent2_name: '',
                    parent2_phone: '',
                    parent2_email: '',
                    checklist: theChecklist,
                    kudos_received: [],
                    kudos_given: [],
                    number_kudos_received: 0,
                    number_warnings_received: 0,
                    warnings_received: [],
                }
            })
            .then((response) => {
                this.toggleAddMentee();
                alert('Mentee successfully created!')
            })
            .catch((error) => {
                console.log('Axios-side error in creating new mentee');
            })
        }  
    }

    addMentor () {
        if (this.state.addMentorFullName === '') {
            alert('Please add a name for the new mentor :) ');
        } else if (this.state.addMentorEmail === '') {
            alert('Please add an email for the new mentor :) ');
        } else {
            axios.post('/users/new', {
                user: {
                    full_name: this.state.addMentorFullName,
                    email: this.state.addMentorEmail,
                    level: 'mentor',
                    grade: this.state.addMentorLevel,
                    sex: '',
                    hometown: '',
                    school: '',
                    phone_number: '',
                    number_kudos_received: 0,
                    kudos_received: [],
                    kudos_given: [],
                    facebook_page: '',
                    twitter_page: '',
                    linked_in_page: '',
                    current_city: '',
                    current_state: '', 
                    current_country: '',
                    undergraduate_school: '',
                    graduate_school: '',
                    majors: '',
                    employer: '',
                }
            })
            .then((response) => {
                this.toggleAddMentor();
                alert('Mentor successfully created!')
            })
            .catch((error) => {
                console.log('Axios-side error in creating new mentor');
            })
        }
    }

    deleteUser () {
        console.log('email to delete', this.state.deleteUserEmail);
        if (this.state.deleteUserEmail === '') {
            console.log(' Please enter the email of the user to be deleted :)  ')
        } else {
            axios.delete('/users', {
                data: {email: this.state.deleteUserEmail}, // for delete, data MUST BE SPECIFIED FOR THE OBJECT, ELSE IT WILL NOT WORK
              })
              .then( (response) => {
                this.toggleDeleteUser();
                alert('User successfully deleted')
              })
              .catch((error) => {
                console.log('Axios error in deleting user', error);
              });
        }
    }

    toggleAddMentee() {
        if (this.state.showAddMenteeView === false) {
            this.setState({ showAddMenteeView: true });
        } else {
            this.setState({ showAddMenteeView: false });
        }
        
    }

    toggleAddMentor() {
        if (this.state.showAddMentorView === false) {
            this.setState({ showAddMentorView: true });
        } else {
            this.setState({ showAddMentorView: false });
        }
        
    }

    toggleDeleteUser() {
        if (this.state.showDeleteUserView === false) {
            this.setState({ showDeleteUserView: true });
        } else {
            this.setState({ showDeleteUserView: false });
        }
         
    }


    render () {
        let addMenteeButton = null;
        let addMentorButton = null; 
        let deleteUserButton = null;

        let addMenteeView = null;
        let addMentorView = null;
        let deleteUserView = null;

        if (this.state.showAddMenteeView === true) {
            addMenteeView = (
                <div className="manage-users-add-container">
                    Mentee Full Name
                    <input name='addMenteeFullName' onChange={this.retrieveInfo.bind(this)}/>
                    Mentee Email
                    <input name="addMenteeEmail" onChange={this.retrieveInfo.bind(this)}/>
                    Mentor Email
                    <input name="addMenteesMentorEmail" onChange={this.retrieveInfo.bind(this)}/>
                    Grade
                    <select className="manage-users-mentor-level" onChange={this.retrieveMenteeLevel.bind(this)}>
                        <option> 3 </option>
                        <option> 2 </option>
                        <option> 1 </option>
                        <option> T</option>
                    </select>
                    <div>
                        <button className="manage-users-add-buttons" onClick={this.addMentee.bind(this)}> Add </button>
                        <button className="manage-users-add-buttons" onClick={this.toggleAddMentee.bind(this)}> Cancel </button>
                    </div>
                
                </div>
            )

        } else {
            addMenteeButton = (
                <button className="add-mentor-mentee-button" onClick={this.toggleAddMentee.bind(this)}> Add Mentee</button>
            )
        }

        if (this.state.showAddMentorView === true) {
            addMentorView = (
                <div className="manage-users-add-container">
                    Mentor Full Name
                    <input name='addMentorFullName' onChange={this.retrieveInfo.bind(this)}/>
                    Mentor Email
                    <input name='addMentorEmail' onChange={this.retrieveInfo.bind(this)}/>
                    Level
                    <select className="manage-users-mentor-level" onChange={this.retrieveMentorLevel.bind(this)}>
                        <option> mentor </option>
                        <option> admin </option>
                    </select>
                    <div>
                        <button className="manage-users-add-buttons" onClick={this.addMentor.bind(this)}> Add </button>
                        <button className="manage-users-add-buttons" onClick={this.toggleAddMentor.bind(this)}> Cancel </button>
                    </div>
                
                </div>
            )

        } else {
            addMentorButton = (
                <button className="add-mentor-mentee-button" onClick={this.toggleAddMentor.bind(this)}> Add Mentor</button>
            )
        }

        if (this.state.showDeleteUserView === true) {
            deleteUserView = (
                <div className="manage-users-delete-container">
                    User Email
                    <input name='deleteUserEmail' onChange={this.retrieveInfo.bind(this)}/>
                    <div>
                        <button className="manage-users-delete-buttons" onClick={this.deleteUser.bind(this)} > Delete </button>
                        <button className="manage-users-delete-buttons" onClick={this.toggleDeleteUser.bind(this)}> Cancel </button>
                    </div>
                
                </div>
            )
            
        } else {
            deleteUserButton = (
                <button className="create-assignment-sub-button" onClick={this.toggleDeleteUser.bind(this)}> Delete User </button>
            )
        }


        return (
            <div>
                <div className="manage-users-container">
                    {addMenteeButton}
                    {addMenteeView}

                    {addMentorButton}
                    {addMentorView}

                    {deleteUserButton}
                    {deleteUserView}

                </div>
            </div>
        )
    }
}

export default ManageUsers;