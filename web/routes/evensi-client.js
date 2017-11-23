var express = require('express')
var https = require('https')
var router = express.Router()
var evensi = require('../config.json').evensi

var authToken

const authenticate = async (req, res, next) => {
  if(!authToken) {
    try {
      authToken = await getAuthToken(
        {
          host: evensi.evensi_path,
          path: evensi.api_version + '/authenticate/app?appid='+ evensi.app_id +'&appsecret=' + evensi.app_secret
        }
      )
    } catch(e) {
      console.log(e)
    }
  }
  next()
}

const getAuthToken = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let body = ''

      res.on('data', (d) => {
        body += d;
      })

      res.on('end', (d) => {
        resolve(JSON.parse(body).data[0].token)
      })
    }).on('error', (e) => {
      reject(e)
    })
  })
}

router.use(authenticate)

/* Will get all future events from evensi */
router.get('/getAllFutureEvents', function(req, res, next) {
  // Go throught all days
  // save them to database
  console.log("hello")
  res.send("Hello")
})

module.exports = router
