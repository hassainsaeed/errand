const express = require('express');
const config = require('../src/config')

async function startServer(app) {
  const loader = await require('../src/loaders');
  loader(app);

  app.listen(config.PORT, (err) => {
    if (err) {
      process.exit(1);
    }
    console.info(`
        ###################################################
        ⚠️ Test Server listening on port: ${config.PORT} ⚠️
        ###################################################
      `)
  });

  return app;
}

const app = express();
const setUpApp = startServer(app);

module.exports = setUpApp
