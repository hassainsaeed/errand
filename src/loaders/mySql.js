// This module connects the application to the MySql DB

const mysql = require('mysql');
const config = require('../config');

const connection = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    return console.error(`error: ${err.message}`);
  }

  return console.log('🔗 Connected to the MySQL server.');
});


module.exports = connection;
