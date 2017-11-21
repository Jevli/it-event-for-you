var express = require('express');
var router = express.Router();

var authToken;
/*
var authentication = (req, res, next) => {
  if (!authToken) {
    //Authentication token should be got here if missing
  }
  next()
}

router.use(authentication())
*/

/* Will get all future events from evensi */
router.get('/getAllFutureEvents', function(req, res, next) {
  // Go throught all days
  // save them to database
});

module.exports = router;
