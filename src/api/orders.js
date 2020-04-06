let express = require('express'),
router = express.Router();

router.get('/', function (req, res) {
  res.send("Return all the orders")
});

router.post('/', function(req, res) {
  res.send("Order has been created")
});


module.exports = router
