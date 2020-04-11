const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Return all the orders');
});

router.post('/', (req, res) => {
  res.send('Order has been created');
});


module.exports = router;
