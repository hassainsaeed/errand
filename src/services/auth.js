const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mySqlConnection = require('../loaders/mySql');
const config = require('../config');


// Function which will generate random string of characters of inputted length - i.e. salt
const generateRandomString = function (length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

// Function to generate hash of password + salt using sha512 algorith
const generateHash = function (password, salt) {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const hashValue = hash.digest('hex');
  return {
    salt,
    passwordWithSaltHash: hashValue,
  };
};

// Function to generate a salted and hashed password
function saltAndHashPassword(password) {
  const salt = generateRandomString(8);
  return generateHash(password, salt);
}

// Function to return a signed JWT for a user
function generateToken(user) {
  const today = new Date();
  const expiry = new Date(today);
  expiry.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
    },
    config.JWT_SECRET,
  );
}

async function signUp(firstName, lastName, email, password, phoneNumber) {
  try {
    const { salt, passwordWithSaltHash } = saltAndHashPassword(password);
    // TO DO: pass in created_at date time
    const user = {
      first_name: firstName, last_name: lastName, email, phone_number: phoneNumber, password: passwordWithSaltHash, salt,
    };
    mySqlConnection.query('INSERT INTO users SET ?', user, (err, res) => {
      // TODO: make sure no two users with same email can sign up
      // TODO: make it so throwing an error does not crash the app
      // TODO: make columns of user be non null
      if (err) throw err;
      // Sample of res: {"fieldCount":0,"affectedRows":1,"insertId":11,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}
      console.log('✔️  Created user ID: ', res.insertId);
    });
    return generateToken(user);
  } catch (e) {
    console.log(`🔥 Error! ${e}`);
    throw e;
  }
}


module.exports = {
  signUp,
};
