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
	}

	render () {

		var backgroundImages = this.state.backgroundList.map((background, index) => {
			console.log(background);

			return (
				<div className='col-xs-6 col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3 col-xs-offset-3'>
					<div className={background.isSelected ? 'thumbnail selected' : 'thumbnail'}>
						<img onClick={this.handleSelectBackground.bind(this, background)} src={config.SERVER_URL + background.path} />
						<div className='caption text-center'>
							<p><strong>Name:</strong> {background.name} </p>
							<p><strong>Description:</strong> {background.description} </p>

							<div className='row'>
								<div classname='col-xs-6 col-sm-6 col-md-6'>
									<div style={{float: 'left'}}>
										<button type="button" className="btn btn-default">Previous</button>
									</div>
								</div>

								<div classname='col-xs-6 col-sm-6 col-md-6'>
									<button type="button" className="btn btn-default">Next</button>
								</div>

							</div>


						</div>


					</div>
				</div>
			)
		})

		return (
			<div className='container'>
				{this.state.currentStep === 1 ?
					<div>
					</div>
				: null}

				{this.state.currentStep === 2 ?
					<div className='row'>

						<p className='text-center bold'>Select Your Favorite Background </p>

						<div className='row'>
							{backgroundImages}
						</div>

					</div>
				: null}


				{this.state.currentStep === 3 ?
					<div>
					</div>
				: null}
			</div>
		)
	}
}

export default Home;