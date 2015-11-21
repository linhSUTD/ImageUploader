/**
 * Created by nguyenlinh on 11/20/15.
 */
import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
	constructor () {
		this.bindActions(HomeActions);
		this.currentStep = 2;
		this.currentBackground = 0;
		this.selectedBackground = 0;
		this.backgroundList = [];

	}

	onQueryBackgroundListFail (err) {
		toastr.error(err);
	}

	onQueryBackgroundListSuccess (list) {
		console.log(list);
		list.map((background) => {
			background.isSelected = false;
			if (this.selectedBackground == background._id) {
				background.isSelected = true;
			}
		})

		this.backgroundList = list;
	}
}

export default alt.createStore(HomeStore);
