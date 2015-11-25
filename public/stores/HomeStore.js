/**
 * Created by nguyenlinh on 11/20/15.
 */
import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
	constructor () {
		this.bindActions(HomeActions);
		this.backgroundList = [];
		this.currentBackground = null;
		this.selectedImage = "1359217054097582";
		this.downloadLink = null;
		this.isDownload = false;
		this.preview_image = null;
	}

	onQueryBackgroundListFail (err) {
		toastr.error(err);
	}

	onQueryBackgroundListSuccess (list) {
		this.backgroundList = list;
		if (this.backgroundList && this.backgroundList.length) {
			this.currentBackground = 0;
		}
	}

	onGetNextBackground () {
		if (this.currentBackground == this.backgroundList.length - 1) {
			this.currentBackground = 0;
		} else {
			this.currentBackground = this.currentBackground + 1;
		}
	}

	onGetPreviousBackground () {
		if (this.currentBackground == 0) {
			this.currentBackground = this.backgroundList.length - 1;
		} else {
			this.currentBackground = this.currentBackground - 1;
		}
	}


	onUploadToServerSuccess (data) {
		this.isDownload = true;
		this.downloadLink = data.download_link;
		this.preview_image = data.image_path;

		console.log(this.preview_image);
	}

	onUploadToServerFail (msg) {
		toastr.error(err);
	}
}

export default alt.createStore(HomeStore);
