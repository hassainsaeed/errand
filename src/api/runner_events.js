let express = require('express'),
router = express.Router();

router.get('/', function (req, res) {
  res.send("Return all the runner events")
});

router.post('/', function(req, res) {
  res.send("Runner event has been created")
});


module.exports = router
