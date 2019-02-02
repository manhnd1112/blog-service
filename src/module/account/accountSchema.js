/**
 * @author Long Nguyen-Phuc (reallongnguyen@gmail.com)
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const accountSchema = new Schema({
  email: {
    type: String,
    require: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: String,
  accessToken: String,
  name: {
    type: String,
    trim: true,
  },
  avatar: String,
  isAdmin: Boolean,
}, {
  timestamps: true,
});

accountSchema.index({ email: 1 });

module.exports = accountSchema;
