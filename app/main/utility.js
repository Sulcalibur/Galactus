const fs = require('fs-extra');

exports.clearDirectory = (directory) => {
  fs.emptyDir(directory, err => console.log(err))
};

exports.saveTolocation = (fileDirectory, directoryToSave, done) => {
 if (directoryToSave) {
   fs.readdir(fileDirectory, (err, files)=>{
     files.forEach(file => {
       const currentLocation = `${fileDirectory}/${file}`;
       const newLocation = `${directoryToSave}/${file}`;
       fs.rename(currentLocation, newLocation, (err) => console.log(err));
     });

     done();
   });
 }
}

const getFileSize = (filePath) => {
  // Size in bytes
  const { size } = fs.statSync(filePath);

  return size; // returning size in bytes
}

const getTotalSize = (filePaths) => {
  return filePaths.map(path => getFileSize(path)).reduce((a, b) => a + b, 0);
}

exports.getFileSize = getFileSize;
exports.getTotalSize = getTotalSize;