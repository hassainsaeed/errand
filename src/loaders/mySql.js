// This module connects the application to the MySql DB

const mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool({
  connectionLimit: 100,
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
});


module.exports = pool;
