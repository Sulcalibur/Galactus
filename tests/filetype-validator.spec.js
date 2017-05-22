const { expect } = require('chai');
const { isSupportedFileType } = require('../app/main/filetype-validator');

describe('Filetype validator', () => {
  describe('.isSupportedFileType', () => {
    it('should allow multiple filetypes', () => {
      expect(isSupportedFileType('image/png')).to.be.true;
      expect(isSupportedFileType('image/jpeg')).to.be.true;
      expect(isSupportedFileType('image/svg+xml')).to.be.true;
      expect(isSupportedFileType('image/gif')).to.be.true;
      expect(isSupportedFileType('image/vnd.adobe.photoshop')).to.be.true;
      expect(isSupportedFileType('test')).to.be.false;
    });
  });
});
