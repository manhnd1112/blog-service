const {
  createContainer,
  asValue,
  asClass,
  asFunction,
} = require('awilix');
const path = require('path');

class DependencyInjection {
  constructor(configs) {
    this.configs = configs;
  }

  init() {
    const {
      rootPath,
      settings,
      createLogger,
      createMorgan,
      database,
      URIMaker,
    } = this.configs;

    this.container = createContainer();

    this.container.register({
      rootPath: asValue(rootPath),
      logger: asFunction(createLogger).singleton(),
      morgan: asFunction(createMorgan).singleton(),
      settings: asValue(settings),
      database: asValue(database),
      uriMaker: asClass(URIMaker).singleton(),
    });

    this.container.loadModules([path.join(rootPath, 'src/module/**/*.js')], {
      // We want to register `UserService` as `userService` -
      // by default loaded modules are registered with the
      // name of the file (minus the extension)
      formatName: 'camelCase',
    });

    return this;
  }

  getContainer() {
    if (!this.container) {
      throw new Error('You must init Dependency Injection before use container');
    }
    return this.container;
  }
}

module.exports = DependencyInjection;
