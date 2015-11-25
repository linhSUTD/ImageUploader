/**
 * Created by nguyenlinh on 11/20/15.
 */
import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
	constructor () {
		this.bindActions(HomeActions);
		this.currentStep = 2;
		this.selectedBackground = null;
		this.backgroundList = [];
		this.currentBackground = null;
		this.selectedImage = "1359217054097582";
		this.loadingPage = false;
		this.downloadLink = null;
	}

	onQueryBackgroundListFail (err) {
		toastr.error(err);
	}

	onQueryBackgroundListSuccess (list) {
		list.map((background) => {
			background.isSelected = false;
			if (this.selectedBackground && this.selectedBackground._id == background._id) {
				background.isSelected = true;
			}
		})

		this.backgroundList = list;

		if (this.backgroundList && this.backgroundList.length) {
			this.currentBackground = 0;
		}
	}


	onSetSelectedBackground (selected) {
		this.backgroundList.map((background) => {
			if (background._id != selected._id) {
				background.isSelected = false;
			} else {
				background.isSelected = true;
				this.selectedBackground = selected;
			}
		})
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

	onSetCurrentStep (page) {
		if (this.selectedBackground == null) {
			toastr.error("Please select your favorite background!");
		} else {
			this.currentStep = page;
		}
	}

	onShowLoadingPage () {
		this.loadingPage = true;
	}

	onUploadToServerSuccess (downloadLink) {
		this.loadingPage = false;
		this.downloadLink = downloadLink;
		this.currentStep = 4;
	}

	onUploadToServerFail (msg) {
		this.loadingPage = false;
		this.currentStep = 2;
		toastr.error(err);
	}
}

export default alt.createStore(HomeStore);
