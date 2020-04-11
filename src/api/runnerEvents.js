const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Return all the runner events');
});

router.post('/', (req, res) => {
  res.send('Runner event has been created');
});


module.exports = router;
