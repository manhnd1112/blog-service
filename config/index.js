process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const path = require('path');

const Setting = require(`./Setting.${process.env.NODE_ENV}`); // eslint-disable-line
const { createWinston, createMorgan } = require('./logger');
const database = require('./db');
const DependencyInjection = require('./DependencyInjection');
const { URIMaker } = require('./URIMaker');

const settings = new Setting();
const rootPath = path.join(__dirname, '..');

const dependencyInjection = new DependencyInjection({
  rootPath,
  settings,
  database,
  URIMaker,
  createMorgan,
  createLogger: createWinston,
});

module.exports = {
  dependencyInjection,
};
