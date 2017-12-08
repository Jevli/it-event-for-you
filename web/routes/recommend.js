const express = require('express'),
      https = require('https'),
      router = express.Router()
      Recommender = require('../utils/recommender'),
      recommender = new Recommender()

router.get('/rec', (req, res, next) => {
  const itEvent = recommender.findITEvent( (result) => {
    res.json(result)
  })
})
