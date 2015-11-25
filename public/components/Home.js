/**
 * Created by nguyenlinh on 11/20/15.
 */
import React from 'react';
import {Link} from 'react-router';
import HomeActions from '../actions/HomeActions';
import HomeStore from '../stores/HomeStore';
import config from '../config';

class Home extends React.Component {

	constructor (props) {
		super (props);
		this.state = HomeStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	onChange (state) {
		this.setState(state);
	}

	componentDidMount () {
		HomeStore.listen(this.onChange);
		HomeActions.queryBackgroundList();
	}

	handleNextBackground () {
		HomeActions.getNextBackground ();
	}

	handlePreviousBackground () {
		HomeActions.getPreviousBackground ();
	}

	uploadToServer () {
		if (this.state.currentBackground == null || this.state.selectedImage == null) {
			HomeActions.uploadToServerFail ("Missing Background or Personal Images!");
		} else {
			HomeActions.uploadToServer (this.state.backgroundList[this.state.currentBackground], this.state.selectedImage);
		}
	}

	render () {
		var backgroundImage = this.state.backgroundList.map((background, index) => {
			if (index == this.state.currentBackground) {
				return (
					<div className="slides">
						<div className='slide'>
							<img src={config.SERVER_URL + background.path} />
						</div>

						<div className='nav'>
							<label onClick={this.handlePreviousBackground.bind(this)} className='prev'>&#x2039;</label>
							<label onClick={this.handleNextBackground.bind(this)} className='next'>&#x203a;</label>
						</div>
					</div>
				)
			}
		});

		return (
			<div>
				<div className='container'>
					{this.state.isDownload == false ?
						<div className='row'>
							<div className='col-xs-5 col-sm-5 col-md-5'>
								{backgroundImage}
							</div>

							<div className='col-xs-2 col-sm-2 col-md-2 text-center'>
								<button className='centerBtn'>
									<img src='http://4.bp.blogspot.com/-s0A9_RuxvG4/U01dRqUHSmI/AAAAAAAAARU/Nfw9k8mE6uY/s1600/bat+quai+la+gi.png' onClick={this.uploadToServer.bind(this)}/>
								</button>
							</div>

							<div className='col-xs-5 col-sm-5 col-md-5'>
								<div className='thumbnail'>
									<img src={"http://graph.facebook.com/" + this.state.selectedImage + "/picture?width=400&height=400"} />
								</div>
							</div>
						</div>

						:

						<div className='row'>
							<p className='text-center bold'>Click Image!</p>

							<div className='col-xs-3 col-sm-3 col-md-3 text-center'>
							</div>

							<div className='col-xs-6 col-sm-6 col-md-6'>
								<a href={this.state.downloadLink}>
									<div className='preview'>
										<img src={config.SERVER_URL + this.state.preview_image} />
									</div>
								</a>
							</div>
						</div>
					}
				</div>
			</div>
		)
	}
}

export default Home;