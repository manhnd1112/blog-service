const Joi = require('joi');

const mediumPassword = /^[\x20-\x7E]{6,50}$/;

const schemaCreateAccount = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  password: Joi.string().regex(mediumPassword).required(),
  name: Joi.string().min(2).max(30).required(),
});

const validateCreateAccount = account => Joi.validate(account, schemaCreateAccount);

module.exports = () => ({
  validateCreateAccount,
});
