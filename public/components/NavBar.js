/**
 * Created by nguyenlinh on 11/20/15.
 */
import React from 'react';
import {Link} from 'react-router';
import NavBarActions from '../actions/NavBarActions';
import NavBarStore from '../stores/NavBarStore';

class NavBar extends React.Component {
	constructor (props) {
		super (props);
		this.state = NavBarStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	onChange (state) {
		this.setState(state);
	}

	componentDidMount () {
		var socket = io.connect();
		socket.on('onlineUsers', function (data) {
			NavBarActions.updateOnlineUsers(data);
		})
	}

	render () {
		return  (
			<nav className='navbar navbar-default navbar-static-top'>
				<div className='navbar-header'>
					<Link to='/' className='navbar-brand'>
						AVATAR
						<span className='badge badge-up badge-danger'>{this.state.onlineUsers}</span>
					</Link>
				</div>
			</nav>
		)
	}
}

export default NavBar;