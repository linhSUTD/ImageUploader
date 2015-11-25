/**
 * Created by nguyenlinh on 11/20/15.
 */
import alt from '../alt';
import config from '../config';

class HomeActions {
	constructor () {
		this.generateActions (
			'queryBackgroundListSuccess',
			'queryBackgroundListFail',
			'setSelectedBackground',
			'getNextBackground',
			'getPreviousBackground',
			'setCurrentStep',
			'uploadToServerSuccess',
			'uploadToServerFail',
			'showLoadingPage'
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

	uploadToServer (selectedBackground, selectedImage) {
		this.actions.showLoadingPage();

		$.ajax({url: '/api/images/upload', data: {fb_id: selectedImage, background: selectedBackground.path}})
		.done((data) => {
			console.log(data);
			this.actions.uploadToServerSuccess(data.download_link);
		})
		.fail((jqXhr) => {
			this.actions.uploadToServerFail(jqXhr.responseJSON.message);
		});
	}

}

export default alt.createActions(HomeActions);