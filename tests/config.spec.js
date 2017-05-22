const path = require('path');
const fs = require('fs-extra')
const { expect } = require('chai');
const { readJsonSync } = require('fs-extra');
const { getConfig, setConfig } = require('../app/main/config');
const { CONFIG_LOCATION } = require('../app/main/constants');

describe('Config module', () => {
	before(done => {
			fs.removeSync(CONFIG_LOCATION);
			done();
	});

  describe('.getConfig', () => {
    it('should return a config object', (done) =>{
      getConfig().then((config) => {
        expect(config).to.deep.equal({
          soundEnabled: true,
          statsEnabled: true,
          compressionQuality: 80
        });
      });

      done();
    });
  });

  describe('.setConfig', () => {
    it('should write a config.json file', (done) => {
      const newConfig = {
        soundEnabled: false,
        statsEnabled: true,
        compressionQuality: 80
      };

      setConfig(newConfig).then((updatedConfig) => {
        expect(updatedConfig).to.deep.equal(newConfig);

        getConfig().then(config => {
          expect(config).to.deep.equal(newConfig);
          done();
        });
      });
    })
  });
});
