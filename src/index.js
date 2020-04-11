// Starting entry point of the Errand application


const express = require('express');
const config = require('./config');


async function startServer() {
  const app = express();

  // Load external components needed to start the Errand application - eg MYSql and Express
  // Pass express app into loader so we can set-up all the Express settings and routes we need
  const loader = await require('./loaders');
  loader(app);

  app.listen(config.PORT, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
      return;
    }
    console.log(`
        ################################################
        🙌 Server listening on port: ${config.PORT} 🙌️
        ################################################
      `);
  });
}

startServer();
