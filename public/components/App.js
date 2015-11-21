/**
 * Created by nguyenlinh on 11/20/15.
 */
import React from 'react';
import {RouteHandler} from 'react-router';
import Footer from './Footer';
import NavBar from './NavBar';

class App extends React.Component {
	render() {
		return (
			<div>
				<NavBar />
				<RouteHandler />
				<Footer />
			</div>
		);
	}
}

export default App;