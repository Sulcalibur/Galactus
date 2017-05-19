const { app } = require('electron');

const APP_NAME = 'Galactus';
const CONFIG_FILE_NAME = 'config.json'
const CONFIG_LOCATION = `${app.getPath('userData')}/${CONFIG_FILE_NAME}`;
const TEMP_IMAGE_LOCATION = `${app.getPath('temp')}${APP_NAME}/images`;
const TEMP_PSD_IMAGE_LOCATION = `${app.getPath('temp')}${APP_NAME}/psds`;
const SUPPORTED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/svg+xml',
  'image/gif',
  'image/vnd.adobe.photoshop'
];

const SUPPORTED_MINIFIER_TYPES = [
	'image/png',
	'image/jpeg',
	'image/svg+xml',
	'image/gif',
]

exports.APP_NAME = APP_NAME;
exports.CONFIG_FILE_NAME = CONFIG_FILE_NAME;
exports.CONFIG_LOCATION = CONFIG_LOCATION;
exports.TEMP_IMAGE_LOCATION = TEMP_IMAGE_LOCATION;
exports.TEMP_PSD_IMAGE_LOCATION = TEMP_PSD_IMAGE_LOCATION;
exports.SUPPORTED_FILE_TYPES = SUPPORTED_FILE_TYPES;
exports.SUPPORTED_MINIFIER_TYPES = SUPPORTED_MINIFIER_TYPES;
