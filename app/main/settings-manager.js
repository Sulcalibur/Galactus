const { ipcMain } = require('electron');
const {
  EVENT_FETCH_SETTINGS_START,
  EVENT_FETCH_SETTINGS_DONE,
  EVENT_FETCH_SETTINGS_FAILED,
  EVENT_UPDATE_CONFIG
} = require('../lib/events');
const { getConfig, setConfig } = require('./config');

const start = () => {
  ipcMain.on(EVENT_FETCH_SETTINGS_START, (event) => {
    getConfig().then(config => {
      event.sender.send(EVENT_FETCH_SETTINGS_DONE, { config: config });
    });
  });

  ipcMain.on(EVENT_UPDATE_CONFIG, (event, data) => {
    setConfig(data);
  });
}

module.exports = {
  start: start
}