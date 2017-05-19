const { ipcMain } = require('electron');
const { fork } = require('child_process');
const PSDConverter = require('./services/converter/psd-converter');
const { isSupportedFileType } = require('./filetype-validator');
const StatsWriter = require('./stats-writer');
const { clearDirectory } = require('./utility');
const { TEMP_IMAGE_LOCATION, TEMP_PSD_IMAGE_LOCATION } = require('./constants');
const { getConfig, setConfig } = require('./config');
const Minifier = require('./minifier');
const {
  EVENT_GALACTUS_DROP,
  EVENT_COMPRESSION_START,
  EVENT_COMPRESSION_DONE,
  EVENT_COMPRESSION_FAILED,
  EVENT_UNSUPPORTED_GALACTUS_FILES,
} = require('../lib/events');

const initialiseDropper = () => {
  ipcMain.on(EVENT_GALACTUS_DROP, (event, data) => {
    const { droppedFiles } = data;

    // 2. Do not support dropping of unsupported file
    const hasUnsupportedFiles = droppedFiles.some((file) => !isSupportedFileType(file.type));

    if (hasUnsupportedFiles) {
      event.sender.send(EVENT_UNSUPPORTED_GALACTUS_FILES)
      return;
    }

    getConfig().then(config => {
      clearDirectory(TEMP_IMAGE_LOCATION);
      clearDirectory(TEMP_PSD_IMAGE_LOCATION);

      event.sender.send(EVENT_COMPRESSION_START);
      // Convert psd files before compressing
      if (droppedFiles.some(({path}) => PSDConverter.isPsd(path))) {
        const converterProcess = fork(`${__dirname}/services/converter/index.js`);

        const psdPaths = droppedFiles
        .filter(({ path }) => PSDConverter.isPsd(path))
        .map(({path}) => path);

        const nonPsdPaths = droppedFiles
        .filter(({path}) => !PSDConverter.isPsd(path))
        .map(({path}) => path);

        converterProcess.on('message', handlePSDConverterSuccess.bind(this, event, nonPsdPaths, config));
        converterProcess.send({ psdPaths: psdPaths, outputPath: TEMP_PSD_IMAGE_LOCATION })
      }
      else {
        const images = droppedFiles.map((file) => file.path);
        Minifier.minify(images, TEMP_IMAGE_LOCATION, config).then(
					handleMinifierSuccess.bind(this, event, config),
					handleMinifierFailure.bind(this, event)
				).catch(handleMinifierError.bind(this, event))
      }
    });

    function handleMinifierSuccess(event, config, { stats }) {
      const { statsEnabled } = config;

      if (statsEnabled) StatsWriter.write(stats);

      event.sender.send(EVENT_COMPRESSION_DONE, { savedSize: stats.savedBytes });
    }

		function handleMinifierFailure(event, error) {
			event.sender.send(EVENT_COMPRESSION_FAILED);
		}

		function handleMinifierError(event, error) {
			event.sender.send(EVENT_COMPRESSION_FAILED);
		}

    function handlePSDConverterSuccess(event, nonPsdPaths, config, data) {
      const { convertedImages } = data;
      const images = [].concat(convertedImages).concat(nonPsdPaths);

      Minifier.minify(images, TEMP_IMAGE_LOCATION, config).then(
        handleMinifierSuccess.bind(this, event, config),
        handleMinifierFailure.bind(this, event)
      ).catch(handleMinifierError.bind(this, event))
    }
  });
}

class DropManager {
  static start() {
    initialiseDropper();
  }
}

module.exports = DropManager;