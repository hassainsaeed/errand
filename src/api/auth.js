const express = require('express');
const Container = require('typedi').Container;

const logger = Container.get('logger');
const authServiceInstance = require('../services/auth');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const email = req.body.email;
  const password = req.body.password;
  const phoneNumber = req.body.phone_number;

  logger.info(`🥺 User with email ${email} is trying to sign up for Errand`);

  try {
    const token = await authServiceInstance.signUp(firstName,
      lastName, email, password, phoneNumber);
    logger.info(`😊 ${email} is now signed up!`);
    return res.status(201).json({ token });
  } catch (err) {
    logger.error(`🔥 Error! ${err}`);
    return next(err);
  }
});

router.post('/signin', async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const token = await authServiceInstance.signIn(email, password);
    logger.info(`😊 ${email} is now signed in!`);
    return res.status(200).json({ token });
  } catch (err) {
    logger.error(`🔥 Error! ${err}`);
    return next(err);
  }
});

module.exports = router;
