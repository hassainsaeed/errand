// This module connects the application to the MySql DB

let mysql = require('mysql'),
config = require('../config');

let connection = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME
})

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server. 🔗');
});


module.exports = connection
