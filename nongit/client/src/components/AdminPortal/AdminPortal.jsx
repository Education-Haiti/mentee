import React from 'react';
import axios from 'axios';
import CreateAssignments from './CreateAssignments.jsx';
import ManageUsers from './ManageUsers.jsx';

class AdminPortal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render () {
        return (
            <div className="admin-portal-container">
                <ManageUsers/>
                <CreateAssignments/>
            </div>
        )
    }
}

export default AdminPortal;