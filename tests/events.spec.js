const { expect } = require('chai');
const events = require('../app/lib/events');

describe('Events', () => {
  it('.EVENT_GALACTUS_DROP', () => {
    expect(events.EVENT_GALACTUS_DROP).to.equal('EVENT_GALACTUS_DROP');
  });

  it('.EVENT_COMPRESSION_START', () => {
    expect(events.EVENT_COMPRESSION_START).to.equal('EVENT_COMPRESSION_START');
  });

  it('.EVENT_COMPRESSION_DONE', () => {
    expect(events.EVENT_COMPRESSION_DONE).to.equal('EVENT_COMPRESSION_DONE');
  });

  it('.EVENT_COMPRESSION_FAILED', () => {
    expect(events.EVENT_COMPRESSION_FAILED).to.equal('EVENT_COMPRESSION_FAILED');
  });

  it('.EVENT_UNSUPPORTED_GALACTUS_FILES', () => {
    expect(events.EVENT_UNSUPPORTED_GALACTUS_FILES).to.equal('EVENT_UNSUPPORTED_GALACTUS_FILES');
  });

  it('.EVENT_SAVE_FILES', () => {
    expect(events.EVENT_SAVE_FILES).to.equal('EVENT_SAVE_FILES');
  });

  it('.EVENT_SAVE_DONE', () => {
    expect(events.EVENT_SAVE_DONE).to.equal('EVENT_SAVE_DONE');
  });

  it('.EVENT_FETCH_SETTINGS_START', () => {
    expect(events.EVENT_FETCH_SETTINGS_START).to.equal('EVENT_FETCH_SETTINGS_START');
  });

  it('.EVENT_FETCH_SETTINGS_DONE', () => {
    expect(events.EVENT_FETCH_SETTINGS_DONE).to.equal('EVENT_FETCH_SETTINGS_DONE');
  });

  it('.EVENT_FETCH_SETTINGS_FAILED', () => {
    expect(events.EVENT_FETCH_SETTINGS_FAILED).to.equal('EVENT_FETCH_SETTINGS_FAILED');
  });

  it('.EVENT_UPDATE_CONFIG', () => {
    expect(events.EVENT_UPDATE_CONFIG).to.equal('EVENT_UPDATE_CONFIG');
  });

  it('.EVENT_HANDLE_CONFIG_CHANGED', () => {
    expect(events.EVENT_HANDLE_CONFIG_CHANGED).to.equal('EVENT_HANDLE_CONFIG_CHANGED');
  });

	it('.EVENT_ANALYTICS_APP_STARTED', () => {
    expect(events.EVENT_ANALYTICS_APP_STARTED).to.equal('EVENT_APP_STARTED');
	});

	it('.EVENT_ANALYTICS_MINIFIED', () => {
    expect(events.EVENT_ANALYTICS_MINIFIED).to.equal('EVENT_MINIFIED');
	});
});
