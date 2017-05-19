const { ipcMain, dialog } = require('electron');
const { TEMP_IMAGE_LOCATION } = require('./constants');
const { clearDirectory, saveTolocation } = require('./utility');

const {
  EVENT_SAVE_FILES,
  EVENT_SAVE_DONE
} = require('../lib/events');

const initialiseFileSaver = () => {
	let isOpen = false;
  ipcMain.on(EVENT_SAVE_FILES, (event, data) => {
		if (!isOpen) {
			isOpen = true;
			dialog.showOpenDialog(null, {
				title: 'Choose a directory',
				properties: ['openDirectory', 'createDirectory'],
				buttonLabel: 'Save'
			}, (directory) => {
				isOpen = false;
				saveTolocation(TEMP_IMAGE_LOCATION, directory, () => {
					clearDirectory(TEMP_IMAGE_LOCATION);
					event.sender.send(EVENT_SAVE_DONE);
				});
			});
		}
  });
}

class FileSaveManager {
  static start() {
    initialiseFileSaver();
  }
}

module.exports = FileSaveManager;