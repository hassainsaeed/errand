const express = require('express');

const router = express.Router();

router.post('/signup', (req, res) => {
  res.send('Account has been signed up');
});

router.post('/signin', (req, res) => {
  res.send('Account has signed in');
});

module.exports = router;
