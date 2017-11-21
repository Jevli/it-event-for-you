var express = require('express');
var router = express.Router();

var authToken;

router.use( (req, res, next) => {
  if (!authToken) {

  }

  next()
})

/* Will get all future events from evensi */
router.get('/getAllFutureEvents', function(req, res, next) {
  // Go throught all days
  // save them to database
});

module.exports = router;
