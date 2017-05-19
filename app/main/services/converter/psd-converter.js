const { ensureDir } = require('fs-extra');
const PSD = require('psd');
const { basename, extname } = require('path');

const isPsd = (path) => {
  return extname(path) == '.psd';
}

const convert = (psds, outputPath) => {
  if (!Array.isArray(psds)) throw new Error('Provide an array of filepaths as first argument');
  if (psds.some(psd => !isPsd(psd))) throw new Error('Provide psds only');

  return Promise.all(psds.map(psdPath => {
    return PSD.open(psdPath).then((openedPsd) => {
      const convertedPath = `${outputPath}/${basename(psdPath).replace('psd', 'png')}`;

      return new Promise((resolve, reject) => {
        openedPsd.image.saveAsPng(convertedPath).then(() => {
          resolve(convertedPath);
        }, (err) => reject(err));
      });
    });
  }));
}

module.exports = {
  isPsd: isPsd,
  convert: convert,
};
