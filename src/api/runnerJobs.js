const express = require('express');
const router = express.Router();
const runnerService = require('../services/runnerJobs')


router.get('/', (req, res) => {
  res.send('Return all the job events');
});

router.post('/', async (req, res, next) => {

  res.send('Runner job has been created');

});


module.exports = router;
