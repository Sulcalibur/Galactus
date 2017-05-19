import React, { Component } from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import { filesize } from 'humanize';

export default class Footer extends Component {
  renderSquashTrigger() {
    const {
      showTrigger, onTriggerPress,
    } = this.props;

    if (!showTrigger) return null;

    return (
      <a
        href="javascript://"
        className="footer-trigger"
        onClick={onTriggerPress}
      >
        Save images
      </a>
    );
  }

  renderSettingsTrigger() {
    const { onSettingsPress } = this.props;
    return (
      <a
        href="javascript://"
        className="footer-settings-trigger"
        onClick={onSettingsPress}
      >
        <img src={path.join('assets/icons/cog.svg')} />
      </a>
    );
  }

  renderFooterText() {
    return (
      <p className="footer-text">{this.getFooterText()}</p>
    );
  }

  getFooterText() {
    const {
      didInitialAnimation, isCompressing, showTrigger,
      compressionSizeSaved,
    } = this.props;

    if (!didInitialAnimation) {
      return null;
    } else if (isCompressing) {
      return null;
    } else if (showTrigger && compressionSizeSaved === 0) {
      return 'We\'ve already optimized this image!';
    } else if (showTrigger) {
      return `We squashed ${filesize(compressionSizeSaved)} out of those files. Nice!`;
    }

    return 'Drop an image to squash';
  }

  render() {
    if (!this.props.didInitialAnimation) return null;

    return (
      <nav className="footer">
        {this.renderSquashTrigger()}
        {this.renderSettingsTrigger()}
        {this.renderFooterText()}
      </nav>
    );
  }
}

Footer.propTypes = {
  didInitialAnimation: PropTypes.bool.isRequired,
  isCompressing: PropTypes.bool.isRequired,
  showTrigger: PropTypes.bool.isRequired,
  compressionSizeSaved: PropTypes.number.isRequired,
  onTriggerPress: PropTypes.func.isRequired,
  onSettingsPress: PropTypes.func.isRequired,
};
