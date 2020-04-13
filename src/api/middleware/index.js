const jwt = require('jsonwebtoken');

const config = require('../../config');


// This middleware checks the JWT for incoming requests and verifies if the user is authenticated

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;

  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string. Probably can remove this later
      token = token.slice(7, token.length);
    }
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid',
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token has not been supplied',
    });
  }
};


module.exports = {
  verifyToken: verifyToken,
};
