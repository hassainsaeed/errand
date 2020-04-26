const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mySqlConnection = require('../loaders/mySql');
const config = require('../config');


// Function which will generate random string of characters of inputted length - i.e. salt
function generateRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

// Function to generate hash of password + salt using sha512 algorith
function generateHash(password, salt) {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const hashValue = hash.digest('hex');
  return {
    salt,
    passwordWithSaltHash: hashValue,
  };
}

// Function to generate a salted and hashed password
function saltAndHashPassword(password) {
  const salt = generateRandomString(8);
  return generateHash(password, salt);
}

// Function to return a signed JWT for a user
function generateToken(user, today) {
  const expiry = new Date(today);
  expiry.setDate(today.getDate() + 60);

  return jwt.sign({
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    phone_number: user.phone_number,
  },
  config.JWT_SECRET);
}

function dbQueryForUser(email, password) {
  return new Promise(((resolve, reject) => {
    mySqlConnection.query('SELECT * FROM users WHERE email = ? ', email, (err, res) => {
      if (res.length < 1) {
        reject(new Error('❌ Could not verify email'));
      } else {
        console.log('✔️  Email verified');
        const user = res[0];
        const hashedPassword = user.password;
        const {
          salt,
        } = user;
        console.log('🤔  Verifying password...');
        if (generateHash(password, salt).passwordWithSaltHash === hashedPassword) {
          console.log('✔️  Password verfied');
          resolve(user);
        } else {
          reject(new Error('❌ Could not verify password'));
        }
      }
    });
  }));
}

function dbInsertNewUser(newUserParams) {
  return new Promise(((resolve, reject) => {
    mySqlConnection.query('INSERT INTO users SET ?', newUserParams, (err, res) => {
      if (err) {
        reject(new Error(`❌ Something went wrong while trying to create your account: ${err.message}`));
      } else {
        newUserParams.id = res.insertId;
        console.log('✔️  Created user ID: ', newUserParams.id);
        resolve(newUserParams);
      }
    });
  }));
}

async function signUp(firstName, lastName, email, password, phoneNumber) {
  const {
    salt,
    passwordWithSaltHash,
  } = saltAndHashPassword(password);
  const today = new Date();
  const user = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone_number: phoneNumber,
    password: passwordWithSaltHash,
    salt: salt,
    created_at: today.toISOString().slice(0, 19).replace('T', ' '),
  };
  return dbInsertNewUser(user)
    .then((createdUser) => generateToken(createdUser, today))
    .catch((err) => {
      throw err;
    });
}

async function signIn(email, password) {
  const today = new Date();

  console.log('🤔  Verifying email address...');
  return dbQueryForUser(email, password)
    .then((user) => generateToken(user, today))
    .catch((err) => {
      throw err;
    });
}


module.exports = {
  signUp: signUp,
  signIn: signIn,
};
