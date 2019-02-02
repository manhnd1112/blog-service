/**
 * @author Long Nguyen-Phuc (reallongnguyen@gmail.com)
 */

const status = require('http-status');
const bcrypt = require('bcrypt');

class AccountController {
  /**
   * @param {Object}accountService
   */
  constructor({ accountService }) {
    this.accountService = accountService;
  }

  show(req, res) {
    this.accountService.findAccount({});
    res.status(status.OK).json({
      funtion: 'show',
    });
  }

  async create(req, res, next) {
    const { email, password, name } = req.body;
    req.logger.debug(`[AccountController/create] Request params: ${req.prettyPrint({ email, name })}`);
    const accountValidator = req.container.resolve('accountValidator');
    const result = accountValidator.validateCreateAccount({
      email,
      password,
      name,
    });

    if (result.error) {
      res.status(status.FORBIDDEN).json({
        error: result.error,
      });
      req.logger.debug(`[AccountController/create] Validate? False => response 403.\n Error: ${req.prettyPrint(result.error)}`);
      return;
    }
    req.logger.debug('[AccountController/create] Validate? True => Check email exist');

    try {
      const account = await this.accountService.findAccount({
        conditions: {
          email,
        },
      });

      if (!account) {
        req.logger.debug('[AccountController/create] Does email exist? False => Create account');
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const createdAccount = await this.accountService.insertAccount({
          account: {
            email,
            passwordHash,
            name,
          },
        });
        req.logger.debug(`[AccountController/create] Create account success => response 201.\nData: ${req.prettyPrint(createdAccount)}`);
        res.status(status.CREATED).json(createdAccount);
        return;
      }

      req.logger.debug(`[AccountController/create] Does email exist: True => response 403.\nExist account: ${req.prettyPrint(account)}`);
      res.status(status.CONFLICT).json({
        error: {
          code: status.CONFLICT,
          message: 'EMAIL_IS_EXIST',
          resource: 'ACCOUNT',
        },
      });
    } catch (e) {
      req.logger.error(e);
      next(e);
    }
  }
}

module.exports = AccountController;
