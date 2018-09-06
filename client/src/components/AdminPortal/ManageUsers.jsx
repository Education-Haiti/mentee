import React from 'react';
import axios from 'axios';

class ManageUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddMenteeView: false,
            showAddMentorView: false, 
            showDeleteMenteeView: false, 
            showDeleteMentorView: false,
            addMenteeFullName: '',
            addMenteeEmail: '',
            addMenteeLevel: '3',
            addMentorFullName: '',
            addMentorEmail: '',
            addMentorLevel: 'Mentor',
            deleteMenteeEmail: '',
            deleteMentorEmail: '',

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

    toggleDeleteMentee() {
        if (this.state.showDeleteMenteeView === false) {
            this.setState({ showDeleteMenteeView: true });
        } else {
            this.setState({ showDeleteMenteeView: false });
        }
         
    }

    toggleDeleteMentor() {
        if (this.state.showDeleteMentorView === false) {
            this.setState({ showDeleteMentorView: true });
        } else {
            this.setState({ showDeleteMentorView: false });
        }
        
    }

    render () {
        let addMenteeButton = null;
        let addMentorButton = null; 
        let deleteMenteeButton = null;
        let deleteMentorButton = null;

        let addMenteeView = null;
        let addMentorView = null;
        let deleteMenteeView = null;
        let deleteMentorView = null;

        if (this.state.showAddMenteeView === true) {
            addMenteeView = (
                <div className="manage-users-add-container">
                    Mentee Full Name
                    <input name='addMenteeFullName' onChange={this.retrieveInfo.bind(this)}/>
                    Mentee Email
                    <input name="addMenteeEmail" onChange={this.retrieveInfo.bind(this)}/>
                    Level
                    <select className="manage-users-mentor-level" onChange={this.retrieveMenteeLevel.bind(this)}>
                        <option> 3 </option>
                        <option> 2 </option>
                        <option> 1 </option>
                        <option> T</option>
                    </select>
                    <div>
                        <button className="manage-users-add-buttons"> Add </button>
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
                        <option> Mentor </option>
                        <option> Admin </option>
                    </select>
                    <div>
                        <button className="manage-users-add-buttons"> Add </button>
                        <button className="manage-users-add-buttons" onClick={this.toggleAddMentor.bind(this)}> Cancel </button>
                    </div>
                
                </div>
            )

        } else {
            addMentorButton = (
                <button className="add-mentor-mentee-button" onClick={this.toggleAddMentor.bind(this)}> Add Mentor</button>
            )
        }

        if (this.state.showDeleteMenteeView === true) {
            deleteMenteeView = (
                <div className="manage-users-delete-container">
                    Mentee Email
                    <input name='deleteMenteeEmail' onChange={this.retrieveInfo.bind(this)}/>
                    <div>
                        <button className="manage-users-delete-buttons"> Delete </button>
                        <button className="manage-users-delete-buttons" onClick={this.toggleDeleteMentee.bind(this)}> Cancel </button>
                    </div>
                
                </div>
            )
            
        } else {
            deleteMenteeButton = (
                <button className="create-assignment-sub-button" onClick={this.toggleDeleteMentee.bind(this)}> Delete Mentee </button>
            )
        }

        if (this.state.showDeleteMentorView === true) {
            deleteMentorView = (
            <div className="manage-users-delete-container">
                Mentor Email
                <input name='deleteMentorEmail' onChange={this.retrieveInfo.bind(this)}/>
                <div>
                    <button className="manage-users-delete-buttons"> Delete </button>
                    <button className="manage-users-delete-buttons" onClick={this.toggleDeleteMentor.bind(this)}> Cancel </button>
                </div>
            
            </div>
            )

        } else {
            deleteMentorButton = (
                <button className="create-assignment-sub-button" onClick={this.toggleDeleteMentor.bind(this)}> Delete Mentor</button>
            )
        }
        return (
            <div>
                <div className="manage-users-container">
                    {addMenteeButton}
                    {addMenteeView}

                    {addMentorButton}
                    {addMentorView}

                    {deleteMenteeButton}
                    {deleteMenteeView}

                    {deleteMentorButton}
                    {deleteMentorView}
                </div>
            </div>
        )
    }
}

export default ManageUsers;