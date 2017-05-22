import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';
import Squash from '../components/Squash';
import Footer from '../components/footer';
import {
  EVENT_COMPRESSION_START,
  EVENT_COMPRESSION_DONE,
  EVENT_COMPRESSION_FAILED,
  EVENT_UNSUPPORTED_GALACTUS_FILES,
  EVENT_SAVE_DONE,
  EVENT_FETCH_SETTINGS_START,
  EVENT_FETCH_SETTINGS_DONE,
} from '../../../lib/events';

export default class Compression extends Component {
  componentDidMount() {
    const {
      onCompressionStart,
      onCompressionSuccess,
      onCompressionFailed,
      onUnsupportedFiles,
      onSaveDone,
      onFetchSettingsDone,
    } = this.props;

    this.idleAnimation = setInterval(() => {
      const {
        isDragOn,
        isDragOff,
        isCompressing,
        startIdleAnimation
      } = this.props;

      if (!isDragOn && !isDragOff && !isCompressing) {
        startIdleAnimation()
      }
    }, 15000);

    // Register callbacks
    ipcRenderer.on(EVENT_COMPRESSION_START, onCompressionStart);
    ipcRenderer.on(EVENT_COMPRESSION_DONE, onCompressionSuccess);
    ipcRenderer.on(EVENT_COMPRESSION_FAILED, onCompressionFailed);
    ipcRenderer.on(EVENT_UNSUPPORTED_GALACTUS_FILES, onUnsupportedFiles);
    ipcRenderer.on(EVENT_SAVE_DONE, onSaveDone);
    ipcRenderer.on(EVENT_FETCH_SETTINGS_DONE, onFetchSettingsDone);

    ipcRenderer.send(EVENT_FETCH_SETTINGS_START);
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners(EVENT_COMPRESSION_START);
    ipcRenderer.removeAllListeners(EVENT_COMPRESSION_DONE);
    ipcRenderer.removeAllListeners(EVENT_COMPRESSION_FAILED);
    ipcRenderer.removeAllListeners(EVENT_UNSUPPORTED_GALACTUS_FILES);
    ipcRenderer.removeAllListeners(EVENT_SAVE_DONE);
    ipcRenderer.removeAllListeners(EVENT_FETCH_SETTINGS_DONE);

    clearInterval(this.idleAnimation);
  }

  render() {
    const {
      userConfig,
      needsInitialAnimation,
      needsIdleAnimation,
      needsDragOnAnimation,
      needsDragOffAnimation,
      needsCompressionAnimation,
      needsGiftAnimation,
      isDragOn,
      isDragOff,
      isCompressing,
      endCompressionAnimation,
      hasCompressedFiles,
      compressionSizeSaved,
      onInitialAnimationComplete,
      onIdleAnimationComplete,
      onDragOffAnimationComplete,
      onCompressionAnimationComplete,
      onGiftAnimationComplete,
      onDragOn,
      onDragOff,
      onDrop,
      onTriggerPress,
      onSettingsPress,
    } = this.props;

    return (
      <div>
        <div className="content">
          <Squash
            userConfig={userConfig}
            needsInitialAnimation={needsInitialAnimation}
            needsIdleAnimation={needsIdleAnimation}
            needsDragOnAnimation={needsDragOnAnimation}
            needsDragOffAnimation={needsDragOffAnimation}
            needsCompressionAnimation={needsCompressionAnimation}
            needsGiftAnimation={needsGiftAnimation}
            isDragOn={isDragOn}
            isDragOff={isDragOff}
            endCompressionAnimation={endCompressionAnimation}
            onInitialAnimationComplete={onInitialAnimationComplete}
            onIdleAnimationComplete={onIdleAnimationComplete}
            onDragOffAnimationComplete={onDragOffAnimationComplete}
            onCompressionAnimationComplete={onCompressionAnimationComplete}
            onGiftAnimationComplete={onGiftAnimationComplete}
            onDragOn={onDragOn}
            onDragOff={onDragOff}
            onDrop={onDrop}
          />
        </div>

        <Footer
          didInitialAnimation={!needsInitialAnimation}
          isCompressing={isCompressing}
          showTrigger={hasCompressedFiles}
          compressionSizeSaved={compressionSizeSaved}
          onTriggerPress={onTriggerPress}
          onSettingsPress={onSettingsPress}
        />
      </div>
    );
  }
}

Compression.propTypes = {
  userConfig: PropTypes.object.isRequired,
  startIdleAnimation: PropTypes.func.isRequired,
  needsInitialAnimation: PropTypes.bool.isRequired,
  needsIdleAnimation: PropTypes.bool.isRequired,
  needsDragOnAnimation: PropTypes.bool.isRequired,
  needsDragOffAnimation: PropTypes.bool.isRequired,
  needsCompressionAnimation: PropTypes.bool.isRequired,
  needsGiftAnimation: PropTypes.bool.isRequired,
  isDragOn: PropTypes.bool.isRequired,
  isDragOff: PropTypes.bool.isRequired,
  isCompressing: PropTypes.bool.isRequired,
  endCompressionAnimation: PropTypes.bool.isRequired,
  hasCompressedFiles: PropTypes.bool.isRequired,
  compressionSizeSaved: PropTypes.number.isRequired,
  onInitialAnimationComplete: PropTypes.func.isRequired,
  onIdleAnimationComplete: PropTypes.func.isRequired,
  onDragOffAnimationComplete: PropTypes.func.isRequired,
  onCompressionAnimationComplete: PropTypes.func.isRequired,
  onGiftAnimationComplete: PropTypes.func.isRequired,
  onDragOn: PropTypes.func.isRequired,
  onDragOff: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onTriggerPress: PropTypes.func.isRequired,
  onSettingsPress: PropTypes.func.isRequired,
  onCompressionStart: PropTypes.func.isRequired,
  onCompressionSuccess: PropTypes.func.isRequired,
  onCompressionFailed: PropTypes.func.isRequired,
  onUnsupportedFiles: PropTypes.func.isRequired,
  onSaveDone: PropTypes.func.isRequired,
  onFetchSettingsDone: PropTypes.func.isRequired,
};
