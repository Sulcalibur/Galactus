const PSDConverter =  require('./psd-converter');

process.on('message', ({ psdPaths, outputPath }) => {
  PSDConverter.convert(psdPaths, outputPath).then(images => {
    process.send({ convertedImages: images });
  });
});
