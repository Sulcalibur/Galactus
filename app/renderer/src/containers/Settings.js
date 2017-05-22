import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';
import Range from '../components/Range';
import Loader from '../components/Loader';
import {
  EVENT_FETCH_SETTINGS_START,
  EVENT_FETCH_SETTINGS_DONE,
  EVENT_UPDATE_CONFIG
} from '../../../lib/events';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      config: null,
    };
  }

  componentDidMount() {
    ipcRenderer.send(EVENT_FETCH_SETTINGS_START);
    ipcRenderer.on(EVENT_FETCH_SETTINGS_DONE, this.handleFetchSettings.bind(this));
  }

  componentWillUnmount() {
    // TODO: does not properly unmount
    ipcRenderer.removeAllListeners(EVENT_FETCH_SETTINGS_DONE);
  }

  handleFetchSettings(e, { config }) {
    setTimeout(() => {
      this.setState({ config });
    }, 500)
  }

  handleUpdateSetting(settingName, settingValue) {
    let { config } = this.state;

    switch(settingName) {
      case 'soundEnabled':
      config.soundEnabled = settingValue;
      break;
      case 'compressionQuality':
      config.compressionQuality = settingValue;
      break;
      case 'statsEnabled':
      config.statsEnabled = settingValue;
      break;
    }

    this.setState({ config }, () => {
      ipcRenderer.send(EVENT_UPDATE_CONFIG, config);
    });
  }

  render() {
    const { config } = this.state;
    const { onBackPress } = this.props;

    if (config == null) return <Loader />;

    const {
      soundEnabled,
      compressionQuality,
      statsEnabled,
    } = config;

    return (
      <div className="settings">
        <div className="settings-wrapper">
          <section className="settings-option">
            <div className="settings-info">
              <h3>Sounds</h3>
              <p>Enable sounds</p>
            </div>

            <div className="settings-action">
              <input
                id="sound"
                type="checkbox"
                className="toggle toggle-flat"
                checked={soundEnabled}
                name='soundEnabled'
                onChange={(e) => {
                  const { name, checked } = e.target;
                  this.handleUpdateSetting(name, checked);
                }}
              />
              <label htmlFor="sound" className="toggle-button" />
            </div>
          </section>

          <section className="settings-option">
            <div className="settings-info">
              <h3>Compression quality</h3>
              <p>Preferred image quality</p>
            </div>

            <div className="settings-action">
              <Range
                name='compressionQuality'
                value={compressionQuality}
                onChange={({name, value}) => {
                  this.handleUpdateSetting(name, parseInt(value));
                }}
              />
            </div>
          </section>

          <section className="settings-option">
            <div className="settings-info">
              <h3>Individual compression stats</h3>
              <p>Generate a log file with saved space for each individual file</p>
            </div>

            <div className="settings-action">
              <input
                id="statsEnabled"
                type="checkbox"
                className="toggle toggle-flat"
                checked={statsEnabled}
                name='statsEnabled'
                onChange={(e) => {
                  const { name, checked } = e.target;
                  this.handleUpdateSetting(name, checked);
                }}
              />
              <label htmlFor="statsEnabled" className="toggle-button" />
            </div>
          </section>
        </div>

        <p className='settings-footer'>
          <a href='javascript://' onClick={onBackPress}>Back</a>
        </p>
      </div>
    );
  }
}

Settings.propTypes = {
  onBackPress: PropTypes.func.isRequired
};
