const { app } = require('electron');
const { expect } = require('chai');
const {
  APP_NAME,
  CONFIG_FILE_NAME,
  CONFIG_LOCATION,
  TEMP_IMAGE_LOCATION,
  TEMP_PSD_IMAGE_LOCATION,
  SUPPORTED_FILE_TYPES,
	SUPPORTED_MINIFIER_TYPES
} = require('../app/main/constants');

describe('Constants module', () => {
  describe('APP_NAME', () => {
    it('should equal to squash', () => {
      expect(APP_NAME).to.equal('Galactus');
    });
  });

  describe('CONFIG_FILE_NAME', () => {
    it('should equal to config.json', () => {
        expect(CONFIG_FILE_NAME).to.equal('config.json');
    });
  });

  describe('CONFIG_LOCATION', () => {
    it('should return config path location', () => {
      expect(CONFIG_LOCATION).to.equal(`${app.getPath('userData')}/${CONFIG_FILE_NAME}`);
    });
  })

  describe('TEMP_IMAGE_LOCATION', () => {
    it('should return temporary image location path', () => {
      expect(TEMP_IMAGE_LOCATION).to.equal(`${app.getPath('temp')}${APP_NAME}/images`);
    });
  });

  describe('TEMP_PSD_IMAGE_LOCATION', () => {
    it('should return temporary psd image location path', () => {
      expect(TEMP_PSD_IMAGE_LOCATION).to.equal(`${app.getPath('temp')}${APP_NAME}/psds`);
    });
  });

  describe('SUPPORTED_FILE_TYPES', () => {
    it('should return an array of supported file types', () => {
      expect(SUPPORTED_FILE_TYPES).to.deep.equal([
        'image/png',
        'image/jpeg',
        'image/svg+xml',
        'image/gif',
        'image/vnd.adobe.photoshop'
      ]);
    });
  });

	describe('SUPPORTED_MINIFIER_TYPES', () => {
    it('should return an array of supported file types', () => {
      expect(SUPPORTED_MINIFIER_TYPES).to.deep.equal([
				'image/png',
				'image/jpeg',
				'image/svg+xml',
				'image/gif',
      ]);
    });
	})
});
