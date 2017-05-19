const { BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { clearDirectory } = require('./utility');
const { TEMP_IMAGE_LOCATION, TEMP_PSD_IMAGE_LOCATION } = require('./constants');

let mainWindow = null;

const initialiseBrowser = () => {
	if (mainWindow == null) {
		mainWindow = new BrowserWindow({
			width: 600,
			height: 370,
			titleBarStyle: 'hidden',
			resizable: false,
			maximizable: false,
		});

		if (isDev) {
			mainWindow.webContents.openDevTools()
		}

		mainWindow.on('closed', () => {
			mainWindow = null
			clearDirectory(TEMP_IMAGE_LOCATION);
			clearDirectory(TEMP_PSD_IMAGE_LOCATION);
		});

		// Load a remote URL
		// load webpack dev-server in development
		mainWindow.loadURL(`file://${path.join(__dirname, '../renderer/index.html')}`);
	}
}

class BrowserManager {
  static start() {
    initialiseBrowser();
  }
}

module.exports = BrowserManager;
