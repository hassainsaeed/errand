// Module which will load external components needed to start the Errand application
// Eg connect to MySql DB and set-up Express with proper settings

async function loader(expressApp) {
  const logger = require('./logger');
  logger.info('📝 Logger is loaded');

  const mySqlConnection = await require('./mySql');
  logger.info('📊 MySQL DB Loaded and Ready');

  const dependencyInjectorSetUp = await require('./dependencyInjector');
  dependencyInjectorSetUp(mySqlConnection);
  logger.info('💉 Dependency Injector Loaded and Ready');

  const expressSetUp = await require('./express');
  expressSetUp(expressApp);
  logger.info('🚀 Express Loaded and Ready');
}

module.exports = loader;
