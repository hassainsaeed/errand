const Container = require('typedi').Container;
const loggerInstance = require('./logger');

async function dependencyInjectorSetUp(mySqlPool) {
  try {
    Container.set('logger', loggerInstance);
    Container.set('mySqlPool', mySqlPool);
  } catch (err) {
    loggerInstance.error('🔥 Error on dependency injector loader: %o', err);
    throw err;
  }
}

module.exports = dependencyInjectorSetUp;
