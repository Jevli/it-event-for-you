const express = require('express'),
      https = require('https'),
      router = express.Router(),
      EvensiCli = require('../services/evensicli')
      evensicli = new EvensiCli()


router.get('/getAllTags/', (req, res, next) => {

  evensicli.getAllTags(req.query.locale)
    .then( result => res.json(result) )
    .catch( err => res.json(err) )

})

// Get EventsofDay expects to have query parameters
router.get('/getEventsOfDay', (req, res, next) => {

  evensicli.getEventsOfDay(req.query.daysFromNow,
    req.query.city, req.query.tags, req.query.fields)
    .then( result => res.json(result) )
    .catch( err => res.json(err) )

})

module.exports = router
