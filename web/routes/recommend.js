const express = require('express'),
      https = require('https'),
      router = express.Router()
      Recommender = require('../services/recommender'),
      recommender = new Recommender()

router.get('/itevent', (req, res, next) => {
  const itEvent = recommender.findITEvent( (nayta) => {
    res.json(nayta)
  })
})
