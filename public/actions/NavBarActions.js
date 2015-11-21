/**
 * Created by nguyenlinh on 11/20/15.
 */
import alt from '../alt';

class NavBarActions {
	constructor () {
		this.generateActions(
			'updateOnlineUsers'
		)
	}
}

export default alt.createActions(NavBarActions);