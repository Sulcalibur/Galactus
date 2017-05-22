const path = require('path');
const fs = require('fs-extra');
const { expect } = require('chai');
const { isPsd, convert } = require('../app/main/services/converter/psd-converter');

const validPsd = path.join(__dirname, './fixtures/valid.psd');
const corruptedPsd = path.join(__dirname, './fixtures/corrupted.psd');
const outputPath = path.join(__dirname, './fixtures/')

describe('PSD converter', () => {
  describe('.isPsd', () => {
    it('validates if the given path name is a psd2', () => {
      expect(isPsd(validPsd)).to.be.true;
      expect(isPsd('/sample/test.txt')).to.be.false
    });
  });

  describe('.convert', () => {
    afterEach(() => {
      fs.removeSync(`${outputPath}/test.png`)
    });

    it('throws an exception when no array is provided as first argument', () => {
      expect(convert.bind(this, validPsd, outputPath)).to.throw(Error);
      expect(convert.bind(this, [validPsd], outputPath)).to.not.throw(Error);
    });

    it('throws an exception when first parameter contains non psd files', () => {
      expect(convert.bind(this, ['./sample.txt'], outputPath)).to.throw(Error);
      expect(convert.bind(this, [validPsd], outputPath)).to.not.throw(Error);
    });

    it('converts an array of psd filepaths', (done) => {
      convert([validPsd], outputPath).then(result => {
        expect(fs.existsSync(`${outputPath}/valid.png`)).to.be.true
        done();
      });
    }).timeout(10000);
  });
});
