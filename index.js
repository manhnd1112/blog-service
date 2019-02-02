/**
 * @author Long Nguyen-Phuc (reallongnguyen@gmail.com)
 */

const Server = require('./src/Server');
const { dependencyInjection } = require('./config');

const container = dependencyInjection.init().getContainer();
const settings = container.resolve('settings');
const logger = container.resolve('logger');
const database = container.resolve('database');

logger.info('Auth service is starting');
logger.info('Connect to database');

const main = async () => {
  try {
    const db = await database.connect(settings.database);
    const server = await Server.start(container);

    server.on('close', () => db.close());
    logger.info(`The server is listening in port ${settings.server.port}`);
  } catch (e) {
    logger.error(`Can't start server with error: ${e}`);
  }
};

main().catch(e => logger.error(e));
