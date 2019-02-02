/**
 * @author Long Nguyen-Phuc (reallongnguyen@gmail.com)
 */

class AccountAPI {
  /**
   * @param { Object } accountController AccountControllerのオブジェクトです。
   */
  constructor({ accountController }) {
    this.accountController = accountController;
  }

  /**
   * @param {String}path APIの基本リンクです。例：api/v1/accounts。
   * @param {Object}app
   */
  register(path, app) {
    app.post(`${path}`, (...arg) => this.accountController.create(...arg));
    app.get(`${path}/:id`, (...arg) => this.accountController.show(...arg));
  }
}

module.exports = AccountAPI;
