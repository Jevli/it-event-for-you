const express = require('express'),
      router = express.Router(),
      User = require('../models/user')

router.get('/', (req, res, next) => {
  User.getUsers( (err, result) => {
    err ? res.json(err) : res.json(result)
  })
})

router.get('/create', (req, res, next) => {
  User.createUser({'keywords' : req.query.keywords}, (err, result) => {
    err ? res.json(err) : res.send('Created user: ' + result.insertId)
  })
})

module.exports = router
