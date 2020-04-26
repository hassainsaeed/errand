// Module which will load external components needed to start the Errand application
// Eg connect to MySql DB and set-up Express with proper settings

async function loader(expressApp) {
  const mySqlConnection = await require('./mySql');
  console.log('📊 MySQL DB Loaded and Ready');

  const expressSetUp = await require('./express');
  expressSetUp(expressApp);
  console.log('🚀 Express Loaded and Ready');
}

module.exports = loader;
