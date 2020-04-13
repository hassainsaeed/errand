const express = require('express');

const router = express.Router();
const runnerService = require('../services/runnerJobs');
const middleware = require('./middleware');


router.get('/', (req, res) => {
  res.send('Return all the job events');
});

router.post('/', middleware.verifyToken, async (req, res, next) => {
  const userId = req.body.user_id; // could also be req.decoded.payload.userId // could also be email
  const runnerLatitude = req.body.runner_latitude;
  const runnerLongitude = req.body.runner_longitude;
  const radius = req.body.radius;
  const storeName = req.body.store_name;

  try {
    const runnerJob = await runnerService.createJob(userId, runnerLatitude, runnerLongitude, radius, storeName);
    console.log(`💪 ${userId} just created a new job at ${storeName}!`);
    return res.status(200).json({ runnerJob });
  } catch (err) {
    console.log(`🔥 Error! ${err}`);
    return next(err);
  }
});


module.exports = router;
