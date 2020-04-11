const dotenv = require('dotenv');

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash the whole process

  throw new Error('!! Could not find .env file !!');
}

module.exports = {
  PORT: parseInt(process.env.PORT, 10),
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
};
