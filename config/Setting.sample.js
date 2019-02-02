/**
 * @author Long Nguyen-Phuc (reallongnguyen@gmail.com)
 */

class Setting {
  constructor() {
    this.timeZone = 'Asia/Tokyo';
    this.database = {
      uri: 'DATABASE_URI',
    };

    this.server = {
      port: 3001,
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
  }
}

module.exports = Setting;
