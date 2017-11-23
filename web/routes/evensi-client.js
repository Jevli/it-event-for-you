var express = require('express')
var https = require('https')
var router = express.Router()
var evensi = require('../config.json').evensi

var authToken

const authenticate = async (req, res, next) => {
  if(!authToken && req.path != '/failed') {
    try {
      await getHttpsRequest(
        {
          host: evensi.evensi_path,
          path: evensi.api_version + '/authenticate/app?appid='+ evensi.app_id +'&appsecret=' + evensi.app_secret
        }
      ).then( (result) => {
        if(result.status) {
          authToken = result.data[0].token
          next()
        } else {
          console.log("Error on authentication: " + result.error.message)
          res.redirect('failed')
        }
      })
    } catch(e) {
      console.log(e)
      res.redirect('failed')
    }
  } else {
    next()
  }
}

const getHttpsRequest = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let body = ''

      res.on('data', (d) => {
        body += d;
      })

      res.on('end', (d) => {
        resolve(JSON.parse(body))
      })
    }).on('error', (e) => {
      reject(e)
    })
  })
}

// Use Authentication in all requests here
router.use(authenticate)

router.get('/getAllTags/:locale', (req, res, next) => {

  getHttpsRequest(
    {
      host: evensi.evensi_path,
      path: evensi.api_version + '/category/tag?token=' + authToken + '&locale=' + req.params.locale
    }
  ).then( (result) => {
    if(result.status) {
      res.json(result.data)
    } else {
      console.log("Error on tag search: " + result.error.message)
      res.redirect('failed')
    }
  })

})

// Get EventsofDay expects to have query parameters
router.get('/getEventsOfDay/:day', (req, res, next) => {

  getHttpsRequest(
    {
      host: evensi.evensi_path,
      path: evensi.api_version + '/event/map?token=' + authToken + '&day=' + req.params.day + '&' + req.query.queryParams
    }
  ).then( (result) => {
    if(result.status) {
      res.json(result.data)
    } else {
      console.log("Error on day of events search: " + result.error.message)
      res.redirect('failed')
    }
  })

})

router.get('/failed', (req, res, next) => {
  res.send('Something went wrong')
})

module.exports = router
