const express = require('express'),
      https = require('https'),
      router = express.Router()
      Recommender = require('../services/recommender'),
      recommender = new Recommender()

router.get('/event/', (req, res, next) => {
  const bestEvent = recommender.findRecommendable(req.query.user)
})

router.get('/itevent', (req, res, next) => {
  const days = req.query.days ? req.query.days : 10
  const itEvent = recommender.findITEvent(days)
  // TODO: display returned events
})
