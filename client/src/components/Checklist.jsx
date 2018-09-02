import React from 'react';
import axios from 'axios';

class Checklist extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                items: {
                },
                email: 'jvertil@nd.edu'
        }
    }

    componentDidMount() {
        this.getChecklist(this.state.email);
    }

    getChecklist(theEmail) {
        axios.get(`/mentees/checklist/${theEmail}`)
            .then((response) => {
                this.setState({ items: response.data[0].checklist });
            })
            .catch((error) => {
                console.log('Axios error in getting checklist : ', error);
            })
    }

    updateChecklist(theEmail) {
        axios.put(`/mentees/checklist/${theEmail}`, {
            newChecklist: this.state.items
        })
        .then((response) => {
            this.getChecklist(this.state.email);
        })
        .catch((error) => {
            console.log('Axios-side error in updating checklist : ', error);
        })

    }

    handleCheckedItem (e) {
        console.log(e.target.name);
        console.log(this.state.items);
        let item = e.target.name;
        let newItems = this.state.items; // cannot update nested objects in state. must modify current one and update
        if (this.state.items[`${item}`] === false) {
           newItems[`${item}`] = true;    
        } else {
           newItems[`${item}`] = false;
        }
        this.setState({items: newItems}, () => {
            this.updateChecklist(this.state.email);
        })
    }

    render() {
        return (
            <div>
                {
                    Object.keys(this.state.items).map((keyName, keyIndex) => {
                        return <div>
                                <input type="checkbox" 
                                    checked={this.state.items[`${keyName}`]} 
                                    name={keyName} 
                                    onChange={this.handleCheckedItem.bind(this)}/>
                                {keyName}
                            </div>
                    })
                }
            </div>
        )
    }
    
}

export default Checklist







































