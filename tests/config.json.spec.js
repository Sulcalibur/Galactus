const path = require('path');
const { expect } = require('chai');
const { readJsonSync } = require('fs-extra');

describe('Config.json', () => {
  it('should have reasonable defaults', () => {
    const config = readJsonSync(path.join(__dirname, '../app/main/config.json'));

    expect(config).to.deep.equal({
      soundEnabled: true,
      statsEnabled: true,
      compressionQuality: 80
    });
  })
});
