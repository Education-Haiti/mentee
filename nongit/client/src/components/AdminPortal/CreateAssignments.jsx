import React from 'react';
import axios from 'axios';

class CreateAssignments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render () {
        return (
            <div>
                <div className="create-assignments-container">
                    <div className="create-assignment-title">
                        CREATE AN ASSIGNMENT
                    </div>
                    
                        
                    <div className="create-assignment-item">
                        <div className="create-assignment-subtitle">
                            Assignment Title
                        </div>
                        <input className="create-assignment-input" type="text"/>
                    </div>

                    <div className="create-assignment-item">
                        <div className="create-assignment-subtitle">
                            Class
                        </div>
                        <input className="create-assignment-input" type="text"/>
                    </div>

                    <div className="create-assignment-item">
                        <div className="create-assignment-subtitle">
                            Deadline
                        </div>
                        <input className="create-assignment-input" type="text"/>
                    </div>

                    <div className="create-assignment-item">
                        <div className="create-assignment-subtitle">
                            Relevant Link
                        </div>
                        <input className="create-assignment-input" type="text"/>
                    </div>

                    <div className="create-assignment-item">
                        <div className="create-assignment-subtitle">
                            Description
                        </div>
                        <textarea className="create-assignment-textarea"/>
                    </div>

                    <div className="create-assignment-item">
                        <div className="create-assignment-buttons-container">
                            <button className="create-assignment-sub-button"> Submit </button>
                            <button className="create-assignment-sub-button"> Cancel </button>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default CreateAssignments;