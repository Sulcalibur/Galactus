import React, { Component } from 'react';
import path from 'path';
import { ipcRenderer, remote } from 'electron';
import Compression from './Compression';
import Settings from './Settings';
import Navigation from '../components/navigation';
import {
  EVENT_GALACTUS_DROP,
  EVENT_SAVE_FILES,
  EVENT_FETCH_SETTINGS_START,
} from '../../../lib/events';

const VIEW_GALACTUS = 'VIEW_GALACTUS';
const VIEW_SETTINGS = 'VIEW_SETTINGS';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      config: {
        soundEnabled: true, // needs to be here by default
      },
      currentView: VIEW_GALACTUS,
      needsInitialAnimation: true,
      needsIdleAnimation: false,
      needsDragOnAnimation: false,
      needsDragOffAnimation: false,
      needsCompressionAnimation: false,
      needsGiftAnimation: false,
      isDragOn: false,
      isDragOff: false,
      isCompressing: false,
      endCompressionAnimation: false,
      hasCompressedFiles: false,
      compressionSizeSaved: 0,
    };
  }

  handleMinimize(e) {
    e.preventDefault();
    const currentWindow = remote.getCurrentWindow();
    currentWindow.minimize();
  }

  handleClose(e) {
    e.preventDefault();
    const currentWindow = remote.getCurrentWindow();
    currentWindow.close();
  }

  startIdleAnimation() {
    this.setState({ needsIdleAnimation: true });
  }

  handleInitialAnimationCompletion() {
    this.setState({ needsInitialAnimation: false });
  }

  handleIdleAnimationCompletion() {
    this.setState({ needsIdleAnimation: false });
  }

  handleDragOnAnimationCompletion() {
  }

  handleDragOffAnimationCompletion() {
    this.setState({
      isDragOn: false,
      isDragOff: false,
      needsDragOnAnimation: false,
      needsDragOffAnimation: false,
    });
  }

  handleCompressionAnimationCompletion() {
    this.setState({
      needsGiftAnimation: true,
      needsCompressionAnimation: false,
      endCompressionAnimation: false,
      isCompressing: false,
    });
  }

  handleGiftAnimationCompletion() {
    this.setState({
      needsGiftAnimation: false,
      isCompressing: false,
      isDragOn: false,
      isDragOff: false,
      endCompressionAnimation: false,
      hasCompressedFiles: true,
    });
  }

  handleDragOn(e) {
    e.preventDefault();
    const { isDragOn, isCompressing } = this.state;

    if (!isDragOn && !isCompressing) {
      this.setState({
        isDragOn: true,
        isDragOff: false,
        needsDragOnAnimation: true,
        needsDragOffAnimation: false,
      });
    }
  }

  handleDragOff(e) {
    e.preventDefault();
    const { isDragOn, isDragOff, isCompressing } = this.state;

    if (!isDragOff && !isCompressing) {
      this.setState({
        isDragOff: true,
        isDragOn: false,
        needsDragOffAnimation: true,
        needsDragOnAnimation: false,
      });
    }
  }

  handleDrop(e) {
    e.preventDefault();
    const { isCompressing } = this.state;

    if (!isCompressing) {
      const droppedFiles = [];

      for (const file of e.dataTransfer.files) {
        const { name, path, type } = file;
        droppedFiles.push({ name, path, type });
      }
      ipcRenderer.send(EVENT_GALACTUS_DROP, { droppedFiles });
    }

    return false;
  }

  handleCompressionStart(e) {
    const { config: { soundEnabled } } = this.state;
    const dropAccepted = new Audio(path.join('assets/sounds/drop_accepted.mp3'));

    if (soundEnabled) dropAccepted.play();

    this.setState({
      isCompressing: true,
      needsCompressionAnimation: true,
      needsDragOffAnimation: false,
      needsDragOnAnimation: false,
      hasCompressedFiles: false, // Deleted process images folder on succesfull drop
    });
  }

  handleCompressionSuccess(e, { savedSize }) {
    this.setState({
      isCompressing: false,
      endCompressionAnimation: true,
      needsGiftAnimation: true,
      hasCompressedFiles: true,
      compressionSizeSaved: savedSize,
    });
  }

  handleUnsupportedSquashFiles(e) {
    const { config: { soundEnabled } } = this.state;
    const failedSound = new Audio(path.join('assets/sounds/compression_failed.mp3'));
    if (soundEnabled) failedSound.play();

    setTimeout(() => {
      this.setState({
        isCompressing: false,
        isDragOff: true,
        isDragOn: false,
        needsDragOffAnimation: true,
        needsDragOnAnimation: false,
        hasCompressedFiles: false,
      });
    }, 500);
  }

  handleSaveDone(e) {
    this.setState({ hasCompressedFiles: false });
  }

  handleFetchSettingsDone(e, { config }) {
    this.setState({ config });
  }

  handleCompressionFailed(e) {
    setTimeout(() => {
      const failedSound = new Audio(path.join('assets/sounds/compression_failed.mp3'));
      failedSound.play();
      this.setState({
        needsIdleAnimation: false,
        needsDragOnAnimation: false,
        needsDragOffAnimation: false,
        needsCompressionAnimation: false,
        needsGiftAnimation: false,
        isDragOn: false,
        isDragOff: false,
        isCompressing: false,
        endCompressionAnimation: false,
        hasCompressedFiles: false,
        compressionSizeSaved: 0,
      });
    }, 2000);
  }

  handleTriggerPress(e) {
    e.preventDefault();

    ipcRenderer.send(EVENT_SAVE_FILES);
  }

  handleSettingsPress(e) {
    e.preventDefault();
    this.setState({ currentView: VIEW_SETTINGS });
  }

  handleSettingsBackPress(e) {
    e.preventDefault();
    ipcRenderer.send(EVENT_FETCH_SETTINGS_START);
    this.setState({ currentView: VIEW_GALACTUS });
  }

  componentDidMount() {
    ipcRenderer.send(EVENT_FETCH_SETTINGS_START);
  }

  getView() {
    const { currentView } = this.state;

    switch (currentView) {
      case VIEW_GALACTUS: return this.renderGalactus();
        break;
      case VIEW_SETTINGS: return this.renderSettings();
        break;
      default: return null;
    }
  }

  renderGalactus() {
    const {
      config,
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
    } = this.state;

    return (
      <Compression
        userConfig={config}
        needsInitialAnimation={needsInitialAnimation}
        needsIdleAnimation={needsIdleAnimation}
        needsDragOnAnimation={needsDragOnAnimation}
        needsDragOffAnimation={needsDragOffAnimation}
        needsCompressionAnimation={needsCompressionAnimation}
        needsGiftAnimation={needsGiftAnimation}
        isDragOn={isDragOn}
        isDragOff={isDragOff}
        isCompressing={isCompressing}
        endCompressionAnimation={endCompressionAnimation}
        hasCompressedFiles={hasCompressedFiles}
        compressionSizeSaved={compressionSizeSaved}
        startIdleAnimation={this.startIdleAnimation.bind(this)}
        onInitialAnimationComplete={this.handleInitialAnimationCompletion.bind(this)}
        onIdleAnimationComplete={this.handleIdleAnimationCompletion.bind(this)}
        onDragOffAnimationComplete={this.handleDragOffAnimationCompletion.bind(this)}
        onCompressionAnimationComplete={this.handleCompressionAnimationCompletion.bind(this)}
        onGiftAnimationComplete={this.handleGiftAnimationCompletion.bind(this)}
        onDragOn={this.handleDragOn.bind(this)}
        onDragOff={this.handleDragOff.bind(this)}
        onDrop={this.handleDrop.bind(this)}
        onTriggerPress={this.handleTriggerPress.bind(this)}
        onSettingsPress={this.handleSettingsPress.bind(this)}
        onCompressionStart={this.handleCompressionStart.bind(this)}
        onCompressionSuccess={this.handleCompressionSuccess.bind(this)}
        onCompressionFailed={this.handleCompressionFailed.bind(this)}
        onUnsupportedFiles={this.handleUnsupportedSquashFiles.bind(this)}
        onSaveDone={this.handleSaveDone.bind(this)}
        onFetchSettingsDone={this.handleFetchSettingsDone.bind(this)}
      />
    );
  }

  renderSettings() {
    return (
      <Settings onBackPress={this.handleSettingsBackPress.bind(this)} />
    );
  }

  render() {
    const view = this.getView();

    return (
      <div className="container">
        <Navigation
          onMinimize={this.handleMinimize.bind(this)}
          onClose={this.handleClose.bind(this)}
        />
        {view}
      </div>
    );
  }
}
