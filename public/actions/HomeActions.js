/**
 * Created by nguyenlinh on 11/20/15.
 */
import alt from '../alt';
import config from '../config';

class HomeActions {
	constructor () {
		this.generateActions (
			'queryBackgroundListSuccess',
			'queryBackgroundListFail'
		)
	}

	queryBackgroundList () {

		$.ajax({
			url: config.SERVER_API + 'images/getBackgrounds'
		})
		.done((data) => {
			this.actions.queryBackgroundListSuccess(data.backgroundList);
		})
		.fail((jqXhr) => {
			this.actions.queryBackgroundListFail(jqXhr.responseJSON.message);
		});


	}
}

export default alt.createActions(HomeActions);