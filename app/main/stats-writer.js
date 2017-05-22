const fs = require('fs-extra');
const { filesize } = require('humanize');
const { TEMP_IMAGE_LOCATION } = require('./constants');

function write(stats) {
  fs.outputFile(`${TEMP_IMAGE_LOCATION}/stats.txt`, getStatsString(stats))
}

function getStatsString(stats) {
  const { totalBeforeSize, totalAfterSize, savedBytes, files } = stats;

  const fileMarkup = files.map(file => {
    return `
    ${file.name}: ${filesize(file.beforeBytes)} - ${filesize(file.afterBytes)}  saved ${filesize(file.savedBytes)}
    `;
  });

  // TODO: Make this shit look nice

  return `
  ${fileMarkup.join('\n\r')}
  ________________________________________________________
  Total before: ${filesize(totalBeforeSize)}
  Total saved: ${filesize(savedBytes)}
  Total after: ${filesize(totalAfterSize)}
  `
}


module.exports = {
  write: write
};