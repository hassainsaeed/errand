const express = require('express');
const authServiceInstance = require('../services/auth');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const { email } = req.body;
  const { password } = req.body;
  const phoneNumber = req.body.phone_number;

  console.log(`🥺 User with email ${email} is trying to sign up for Errand`);

  try {
    const token = await authServiceInstance.signUp(firstName, lastName, email, password, phoneNumber);
    console.log(`😊 ${email} is now signed up!`);
    return res.status(201).json({ token });
  } catch (e) {
    console.log(`🔥 Error! ${e}`);
    return next(e);
  }
});

router.post('/signin', (req, res) => {
  res.send('Account has signed in');
});

module.exports = router;
