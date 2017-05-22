import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { APP_NAME } from '../../../../lib/constants';

const backgroundStyle = {backgroundImage: `url('./assets/images/topbar_sprite_win.png')`};

export default class Navigation extends Component {
	render() {
		return (
			<nav className={`navigation`}>
				<p className='navigation-title'>{APP_NAME}</p>
			</nav>
		);
	}
}

Navigation.propTypes = {
	onMinimize: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired
}