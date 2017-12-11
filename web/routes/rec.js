const express = require('express'),
      router = express.Router(),
      Recommender = require('../utils/recommender')

router.get('/events', (req, res, next) => {
  Recommender.findITEvent( result => {
    res.json(result)
  })
})

module.exports = router
