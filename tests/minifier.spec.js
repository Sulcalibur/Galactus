const fs = require('fs-extra');
const path = require('path');
const { expect } = require('chai');
const { minify } = require('../app/main/minifier');
const { getConfig } = require('../app/main/config');
const { getFileSize, clearDirectory } = require('../app/main/utility');

const validFile = path.join(__dirname, './fixtures/valid.png');
const corruptedFile = path.join(__dirname, './fixtures/corrupted.png');
const outputPath = path.join(__dirname, './fixtures/minified')
const config =

describe('Minifier', () => {
	let config = null;
	before((done) => {
		getConfig().then(fetchedConfig => {
			config = fetchedConfig;
			done();
		});
	});

	after((done) => {
		clearDirectory(outputPath);
		done();
	});

  describe('.minify', () => {
		it('minifies a valid file', (done) => {
			minify([validFile], outputPath, config).then(({ processedImages, stats }) => {
				const processedImage = processedImages[0].path;
				const { totalBeforeSize, totalAfterSize, savedBytes, files } = stats;
				const file = files[0];

				expect(processedImages.length).to.equal(1);
				expect(stats).to.have.property('totalBeforeSize');
				expect(stats).to.have.property('totalAfterSize');
				expect(stats).to.have.property('savedBytes');
				expect(stats).to.have.property('files');
				expect(file.name).to.equal('valid.png');
				expect(file.beforeBytes).to.be.above(file.afterBytes);
				done();
			});
		}).timeout(10000);

		it('rejects the promise when given corrupted files', (done) => {
			// Quick and dirty
			minify(corruptedFile, outputPath, config).then(() => {
				expect(false).to.be.true;
				done();
			}, (error) => {
				expect(true).to.be.true;
				done();
			})
		}).timeout(10000);
  })
});
