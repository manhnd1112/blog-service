/**
 * @author Long Nguyen-Phuc (reallongnguyen@gmail.com)
 */

const status = require('http-status');

class AuthController {
  constructor({ accountService }) {
    this.accountService = accountService;
  }

  auth(req, res) {
    this.accountService.findAccount({});
    res.status(status.OK).json({
      function: 'auth',
    });
  }
}

module.exports = AuthController;
