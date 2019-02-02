/**
 * @author Long Nguyen-Phuc (reallongnguyen@gmail.com)
 */

class AuthAPI {
  constructor({ authController }) {
    this.authController = authController;
  }

  register(path, app) {
    app.post(path, (...arg) => this.authController.auth(...arg));
  }
}

module.exports = AuthAPI;
