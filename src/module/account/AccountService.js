/**
 * @author Long Nguyen-Phuc (reallongnguyen@gmail.com)
 */

class AccountService {
  /**
   * @param {Object}account
   */
  constructor({ account }) {
    this.account = account;
  }

  /**
   *
   * @param {Object}conditions
   * @param {String}[projection]
   * @param {Object}[options]
   * @param {Number}options.skip
   * @param {Number}options.limit
   * @returns {Promise<Object[]>}
   */
  findManyAccount({ conditions, projection = null, options = {} }) {
    return this.account.find(conditions, projection, options);
  }

  /**
   *
   * @param {Object}conditions
   * @param {String}[projection]
   * @returns {Promise<Object>}
   */
  findAccount({ conditions, projection = null }) {
    return this.account.findOne(conditions, projection);
  }

  /**
   *
   * @param {Object}account
   * @returns {Promise<Object>}
   */
  insertAccount({ account }) {
    return this.account.insertMany(account);
  }
}

module.exports = AccountService;
