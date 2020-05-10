const bunyan = require('bunyan');
const config = require('../config');


const BunyanLoggerInstance = bunyan.createLogger({
  name: 'errandLogger',
  streams: [{
    type: 'rotating-file',
    path: 'errand.log',
    period: '7d',
    count: 4,
  }, {
    stream: process.stdout,
  }],
});

const LoggerInstance = (config.NODE_ENV === 'dev') ? console : BunyanLoggerInstance;

module.exports = LoggerInstance;
