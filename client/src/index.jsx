import React from 'react';
import ReactDOM from 'react-dom';
import MenteeHome from './components/MenteeHome.jsx';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

/*class Car extends React.Component {
    render(){
        return (<h1>Cars page</h1>);
    }
}*/

 ReactDOM.render(<MenteeHome/>, document.getElementById('mentee'));
/*ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={MenteeHome}>
		</Route>
	</Router>
), document.getElementById('mentee'));*/
