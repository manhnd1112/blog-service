/**
 * @author Long Nguyen-Phuc (reallongnguyen@gmail.com)
 */

const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const http = require('http');
const { serverError, pageNotFound } = require('./error-handler');

class Server {
  /**
   * Start express server
   * @param {Object}container - dependency injection's container
   * @returns {Promise<Object>}
   */
  static start(container) {
    return new Promise((resolve, reject) => {
      if (typeof container.resolve !== 'function') {
        reject(new Error('The server must be started with DI container'));
      }

      const serverSettings = container.resolve('settings').server;
      const apiSettings = container.resolve('settings').api;
      const logger = container.resolve('logger');
      const morgan = container.resolve('morgan');
      const uriMaker = container.resolve('uriMaker');

      if (!serverSettings.port) {
        reject(new Error('The server must be started with an available port'));
        return;
      }

      const app = express();

      app.use(helmet());
      app.use(bodyParser.json());
      app.use(morgan);

      app.use((req, res, next) => {
        req.container = container;
        req.logger = logger;
        req.prettyPrint = obj => JSON.stringify(obj, null, 2);
        next();
      });

      app.use(serverError());

      uriMaker.setConfig(apiSettings);
      const accountAPI = container.resolve('accountApi');
      const authAPI = container.resolve('authApi');
      accountAPI.register(uriMaker.getURI('account'), app);
      authAPI.register(uriMaker.getURI('auth'), app);

      app.get('*', pageNotFound());

      const server = http.createServer(app)
        .listen(serverSettings.port, () => resolve(server));
    });
  }
}

module.exports = Server;
