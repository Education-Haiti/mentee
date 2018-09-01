import React from 'react';
import axios from 'axios';

class Checklist extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                items: {
                    'SAT' : false,
                    'TOEFL': true
                }
        }
    }

    handleCheckedItem (e) {
        console.log(e.target.checked);
        //if (e.target.checked === false) {
            //this.setState()
        //}
        
    }

    render() {
        return (
            <div>
                 {/* {
                     this.state.items.map((item, index) => {
                         return <div>
                                    <input type="checkbox" 
                                        checked={item.done} 
                                        name={item.title} 
                                        onChange={this.handleCheckedItem.bind(this)}/>
                                    {item.title}
                                </div>
                     })
                 } */}
                 {
                     Object.keys(this.state.items).map((keyName, keyIndex) => {
                         return <div>
                                    <input type="checkbox" 
                                        checked={this.state.items[`${keyName}`]} 
                                        //name={item.title} 
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







































