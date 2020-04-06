let express = require('express'),
router = express.Router();

router.post('/signup', function(req, res) {
  res.send("Account has been signed up")
});

router.post('/signin', function(req,res) {
  res.send("Account has signed in")
});

module.exports = router
