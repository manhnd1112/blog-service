/**
 * @author Long Nguyen-Phuc (reallongnguyen@gmail.com)
 */

class Setting {
  /**
   *
   * @param {Object}override: useful for test with other config
   */
  constructor(override) {
    this.timeZone = 'Asia/Tokyo';
    this.database = {
      uri: process.env.DATABASE_URI_TEST || 'mongodb://127.0.0.1/test',
    };

    this.server = {
      port: 6001,
    };

    this.api = {
      account: {
        name: 'accounts',
        base: '/api',
        version: 1,
      },
      auth: {
        name: 'auth',
        base: '/api',
        version: 1,
      },
    };

    Object.assign(this, override);
  }
}

module.exports = Setting;
