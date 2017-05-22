const { SUPPORTED_FILE_TYPES } = require('../main/constants');

const isSupportedFileType = (fileType) => {
  return SUPPORTED_FILE_TYPES.includes(fileType);
}

module.exports = {
  isSupportedFileType: isSupportedFileType,
};
