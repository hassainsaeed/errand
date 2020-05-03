const Container = require('typedi').Container;
const loggerInstance = require('./logger');

async function dependencyInjectorSetUp(mySqlConnection) {
  try {
    Container.set('logger', loggerInstance);
    Container.set('mySqlConnection', mySqlConnection);
  } catch (err) {
    loggerInstance.error('🔥 Error on dependency injector loader: %o', err);
    throw err;
  }
}

module.exports = dependencyInjectorSetUp;
