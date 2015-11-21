/**
 * Created by nguyenlinh on 11/20/15.
 */
import React from 'react';
import {Link} from 'react-router';
import crypto from 'crypto';

class Footer extends React.Component {
	constructor (props) {
		super(props);
	}

	getAvatarUrl (email) {
		var md5 = crypto.createHash('md5');

		var emailHash = md5.update((email || '').toLowerCase()).digest('hex');

		var Avatar = 'https://www.gravatar.com/avatar/[hash]?s=[size]&d=[defaultimg]&r=[rating]';

		return Avatar
			.replace('[hash]', emailHash)
			.replace('[size]', 80)
			.replace('[defaultimg]', 'identicon')
			.replace('[rating]', 'g');

	}

	render () {

		var linh_avatar = this.getAvatarUrl('linhnh@kaist.ac.kr');

		return (
			<footer>
				<div className='container'>
					<div className='row'>
						<div className='col-sm-6'>
							<h3 className='lead'>
								<strong>Information</strong> and <strong>Copyright</strong>
							</h3>

							<p>
								Powered by Node.js, MongoDB, Python and React with Flux architecture and client-side rendering.
							</p>

							<p>
								You may view the Source Code behind this project on <a href='https://github.com/linhSUTD/ImageUploader'><strong style={{color: 'red'}}>GitHub</strong></a>.
							</p>

							<p>
								© 2015.
							</p>
						</div>

						<div className='col-sm-6 hidden-xs'>
							<h3 className='lead'>
								<strong>Contact</strong>
							</h3>

							<ul className='list-inline'>
								<li>
									<a href={'https://www.facebook.com/nguyen.hoanglinh.509'}>
										<img className='thumb-md' src={linh_avatar} />
									</a>
								</li>

							</ul>
						</div>
					</div>
				</div>
			</footer>
		)
	}
}

export default Footer;