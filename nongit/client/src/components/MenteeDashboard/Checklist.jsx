import React from 'react';
import axios from 'axios';

class Checklist extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                items: {
                },
                email: '',
                addItem: false,
                typedVal: '',
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.email !== prevProps.email) { // IT IS EXTREMLY IMPORTANT TO CHECK THE CURRENT AND THE PREVIOUS PROPS. THIS IS REACT DOCUMENTATION. ELSE IT BREAK AND RENDERS TWICE!!
            this.setState({ email: this.props.email }, () => {
                this.getChecklist(this.state.email); // must be placed as a call back to get properly executed     
            })
        }
    }

    getChecklist(theEmail) {
        axios.get(`/users/checklist/${theEmail}`)
            .then((response) => {
                if (response.data[0] === undefined) {
                    this.setState({ items: {} });
                } else {
                    this.setState({ items: response.data[0].checklist }, () => {
                    this.props.calcCompleteness(this.state.items);
                });
                }
                
            })
            .catch((error) => {
                console.log('Axios error in getting checklist : ', error);
            })
    }

    updateChecklist(theEmail) {
        axios.put(`/users/checklist/${theEmail}`, {
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
        // console.log(e.target.name);
        // console.log(this.state.items);
        let item = e.target.name;
        let newItems = this.state.items; // cannot update nested objects in state. must modify current one and update
        if (this.state.items[`${item}`] === false) {
           newItems[`${item}`] = true;    
        } else {
           newItems[`${item}`] = false;
        }
        this.setState({items: newItems}, () => {
            this.updateChecklist(this.state.email);
            this.props.calcCompleteness(this.state.items);
        })
    }

    handleAddItemClick() {
        if (this.state.addItem === true) {
            this.setState({addItem: false});
        } else {
            this.setState({addItem: true});
        }
    }

    handleChange(event) {
        this.setState({typedVal : event.target.value});
    }

    submitNewItem() {
        let newItems = this.state.items;
        newItems[`${this.state.typedVal}`] = false;
        this.setState({items: newItems}, () => {
            this.updateChecklist(this.state.email);
        })
        this.setState({typedVal: ''});
        this.handleAddItemClick();
    }

    deleteItem(item) {
        //console.log(item.keyName);
        let tempItems = this.state.items;
        delete tempItems[item.keyName];

        this.setState({items: tempItems}, () => {
            this.updateChecklist(this.state.email);
            this.props.calcCompleteness(this.state.items);
        })
    }

    render() {
        let addItemComp = null;
        let addItemButton = null;
        let checkListItems = null;
        if (this.state.addItem === true) {
            addItemComp = 
            <div className="addItemContainer">
                <input className="addItemText" onChange={this.handleChange.bind(this)}>
                </input>

                <button className="addItemB" onClick={this.submitNewItem.bind(this)}>
                    Add
                </button>

                <button className="addItemB" onClick={this.handleAddItemClick.bind(this)}>
                    Cancel
                </button>
            </div>
        } else {
            addItemButton = 
            <button className="addItemButton" onClick={this.handleAddItemClick.bind(this)}>
                   Add an item
            </button>
        }

        if (this.state.items !== undefined) {
            checkListItems = (
                <div>
                    {
                        Object.keys(this.state.items).map((keyName, keyIndex) => {
                            return <div className="checklist-item-container" key = { keyIndex }>
                                        <input className="checkbox" type="checkbox" 
                                            checked={this.state.items[`${keyName}`]} 
                                            name={keyName} 
                                            onChange={this.handleCheckedItem.bind(this)}/>
                                        
                                        <div className="checklist-content-container">
                                            <div className="checklist-item-name">
                                                    {keyName}
                                            </div>
                                            
                                            <img className="checklist-x-symbol" src="https://s3.amazonaws.com/educationhaiti/x.png" onClick={() => this.deleteItem({keyName})}/>
                                        </div>
                                
                                    </div>
                        })
                    }
                </div>
            )
        }
        return (

            <div>
                <div className="checklist">
                    <div className="checklist-title">
                        CHECKLIST
                    </div>

                    {checkListItems}
                    
                
                </div>
                

                {addItemButton}
                {addItemComp}

                

            </div>
        )
    }
    
}

export default Checklist







































