const express = require('express'),
      router = express.Router()


router.get('/', (req, res, next) => {
  res.send('Nothing here, go deeper')
})

module.exports = router;
