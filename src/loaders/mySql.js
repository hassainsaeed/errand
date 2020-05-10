// This module connects the application to the MySql DB

const mysql = require('mysql');
const config = require('../config');
const logger = require('./logger');

let connection;

function handleConnection() {
  connection = mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
  });

  connection.connect((err) => {
    if (err) {
      return logger.error(`error: ${err.message}`);
    }

    return logger.info('🔗 Connected to the MySQL server.');
  });

  // Heroku seems to disconnect with MySql often
  // Handle these disconnections by reconnecting with the DB
  connection.on('error', ((err) => {
    logger.error('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleConnection();
    } else {
      throw err;
    }
  }));
}

handleConnection();

module.exports = connection;
