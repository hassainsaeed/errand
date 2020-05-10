const jwt = require('jsonwebtoken');

const config = require('../../config');


// This middleware checks the JWT for incoming requests and verifies if the user is authenticated

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.authorization;

  if (token) {
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: Token is not valid',
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Auth token has not been supplied',
    });
  }
};


module.exports = {
  verifyToken: verifyToken,
};
