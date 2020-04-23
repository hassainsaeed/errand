const express = require('express');

const router = express.Router();
const runnerService = require('../services/runnerJobs');
const middleware = require('./middleware');


router.post('/', middleware.verifyToken, async (req, res, next) => {
  const userId = req.body.user_id; // could also be req.decoded.payload.userId // could also be email
  const runnerLatitude = req.body.runner_latitude;
  const runnerLongitude = req.body.runner_longitude;
  const radius = req.body.radius;
  const storeName = req.body.store_name;

  try {
    const runnerJob = await runnerService.createJob(userId, runnerLatitude, runnerLongitude, radius, storeName);
    console.log(`💪 ${userId} just created a new job at ${storeName}!`);
    return res.status(201).json({ runnerJob });
  } catch (err) {
    console.log(`🔥 Error! ${err}`);
    return next(err);
  }
});

// TODO: Update this route so it can accept optional query parameters
// eg Status= active or status=completd, or is_accepting=1 or store_name=adonis
router.get('/', middleware.verifyToken, async (req, res, next) => {
  try {
    const runnerJobs = await runnerService.getJobs();
    console.log('💪 Returned all active Runner Jobs!');
    return res.status(200).json({ runnerJobs });
  } catch (err) {
    console.log(`🔥 Error! ${err}`);
    return next(err);
  }
});

router.get('/nearme', middleware.verifyToken, async (req, res, next) => {
  const requesterLatitude = req.query.requester_latitude;
  const requesterLongitude = req.query.requester_longitude;

  try {
    const runnerJobsDeliveringToLocation = await runnerService.getJobsDeliveringToLocation(requesterLatitude, requesterLongitude);
    console.log(('💪 Returned all active Runner Jobs delivering to the user\'s location!'));
    return res.status(200).json({ runnerJobsDeliveringToLocation });
  } catch (err) {
    console.log(`🔥 Error! ${err}`);
    return next(err);
  }
});

module.exports = router;
