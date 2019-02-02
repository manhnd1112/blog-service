const { join } = require('path');

module.exports = class URIMaker {
  constructor() {
    this.config = null;
  }

  setConfig(config) {
    this.config = config;
  }

  getURI(resource) {
    if (!this.config) {
      throw new Error('getURI method require a config to run. Use function `setConfig` to set config');
    }

    const uri = this.config[resource];
    switch (typeof uri) {
      case 'string':
        return uri;
      case 'object':
        if (!(uri && uri.base && uri.version && uri.name)) {
          throw new Error('Object config must have properties base, version, name.');
        }
        return join(uri.base, `v${uri.version}`, uri.name);
      default:
        throw new Error(`Config of ${resource} does not exist.`);
    }
  }
};
