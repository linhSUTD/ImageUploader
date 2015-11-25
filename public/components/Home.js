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

	handleSelectBackground (background) {
		HomeActions.setSelectedBackground (background);
	}

	handleNextBackground () {
		HomeActions.getNextBackground ();
	}

	handlePreviousBackground () {
		HomeActions.getPreviousBackground ();
	}

	changeCurrentStep (page) {
		HomeActions.setCurrentStep (page);
	}

	uploadToServer () {
		HomeActions.uploadToServer (this.state.selectedBackground, this.state.selectedImage);
	}

	render () {
		var backgroundImage = this.state.backgroundList.map((background, index) => {
			if (index == this.state.currentBackground) {
				return (
					<div className='thumbnail'>
						<img className={background.isSelected ? 'selected' : null} onClick={this.handleSelectBackground.bind(this, background)} src={config.SERVER_URL + background.path} />

						<div className='caption text-center'>
							<p><strong>Name:</strong> {background.name} </p>
							<p><strong>Description:</strong> {background.description} </p>
						</div>

						<div className='row'>
							<button type="button" className="btn btn-default pull-left align-left" onClick={this.handlePreviousBackground.bind(this)}>Prev</button>
							<button type="button" className="btn btn-default pull-right align-right" onClick={this.handleNextBackground.bind(this)}>Next</button>
						</div>
					</div>
				)
			}
		});

		return (
			<div>
				{this.state.loadingPage == false ?
					<div className='container'>
						{this.state.currentStep === 1 ?
							<div>
							</div>
						: null}

						{this.state.currentStep === 2 ?
							<div className='row'>

								<p className='text-center bold'>Select Your Favorite Background </p>

								<div className='row'>
									<div className='col-xs-3 col-sm-3 col-md-3 text-center'>
										<label onClick={this.changeCurrentStep.bind(this, 1)}>&#x2039;</label>
									</div>

									<div className='col-xs-6 col-sm-6 col-md-6'>
										{backgroundImage}
									</div>

									<div className='col-xs-3 col-sm-3 col-md-3 text-center'>
										<label onClick={this.changeCurrentStep.bind(this, 3)}>&#x203a;</label>
									</div>
								</div>
							</div>
						: null}


						{this.state.currentStep === 3 ?
							<div className='row'>
								<div className='col-xs-5 col-sm-5 col-md-5'>
									<div className='thumbnail'>
										<img src={config.SERVER_URL + this.state.selectedBackground.path} />
									</div>
								</div>

								<div className='col-xs-2 col-sm-2 col-md-2 text-center'>
									<button className='centerBtn'>
										<img src='http://4.bp.blogspot.com/-s0A9_RuxvG4/U01dRqUHSmI/AAAAAAAAARU/Nfw9k8mE6uY/s1600/bat+quai+la+gi.png' onClick={this.uploadToServer.bind(this)}/>
									</button>
								</div>

								<div className='col-xs-5 col-sm-5 col-md-5'>
									<div className='thumbnail'>
										<img src={this.state.selectedImage} />
									</div>
								</div>
							</div>
						: null}
					</div>
				: null}
			</div>
		)
	}
}

export default Home;