/**
 * @author Long Nguyen-Phuc (reallongnguyen@gmail.com)
 */

const mongoose = require('mongoose');
const accountSchema = require('./accountSchema');

module.exports = () => mongoose.model('accounts', accountSchema);
