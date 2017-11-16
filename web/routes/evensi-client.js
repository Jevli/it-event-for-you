var express = require('express');
var router = express.Router();

/* GET evensi-client listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
