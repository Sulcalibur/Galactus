const { join } = require('path');
const fs = require('fs-extra');
const { CONFIG_LOCATION } = require('./constants');

const getConfig = () =>{
  const defaultConfigFile = join(__dirname, './config.json');

  return new Promise((resolve, reject) => {
    if(fs.existsSync(CONFIG_LOCATION)) {
      Promise.all([readJson(defaultConfigFile), readJson(CONFIG_LOCATION)])
      .then(([defaultConfig, userConfig]) => {
        const config = Object.assign({}, defaultConfig, userConfig);
        resolve(config);
      }).catch(err => console.log(err));
    }
    else {
      readJson(defaultConfigFile).then(config => {
        resolve(config)
      }).catch(err => reject(err))
    }
  });
}

const setConfig = (config) => {
  return new Promise((resolve, reject) => {
    fs.outputJson(CONFIG_LOCATION, config, err => {
      if (err) reject(err);
      resolve(config);
    })
  });
}

const readJson = (file) => {
  return new Promise((resolve, reject) => {
    fs.readJson(file, (err, object ) => {
      if (err) reject(err);
      resolve(object);
    })
  })
}



module.exports = {
  getConfig: getConfig,
  setConfig: setConfig
};
