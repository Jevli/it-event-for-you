const moment = require('moment')
      HttpsHelper = require('./httpsConnector'),
      config = require('../config.json').evensi,
      keywords = require('../assets/keywords')

const resolveReject = (r, rs, rj) => r.status ? rs(r.data) : rj(r.error)

const existOrgetAuthToken = (cb) => {
  if (authToken) {
    cb(authToken)
  } else {
    HttpsHelper.getHttpsRequest({
      host: config.evensi_path,
      path: config.api_version + '/authenticate/app?appid=' + config.app_id + '&appsecret=' + config.app_secret
    }, result => {
      if (result.status) {
        authToken = result.data[0].token
        cb(result.data[0].token)
      } else {
        cb(null, result.data[0].token)
      }
    })
  }
}

let authToken

const EvensiCli = {

  getAllTags: locale => {
    return new Promise( (resolve, reject) => {
      existOrgetAuthToken( (token) => {
        HttpsHelper.getHttpsRequest({
          host: config.evensi_path,
          path: config.api_version + '/category/tag?token=' + token + '&locale=' + locale
        }, (result) => resolveReject(result, resolve, reject))
      })
    })
  },
  getEventsOfDay: (daysFromNow, city, tags, fields) => {
    return new Promise( (resolve, reject) => {
      const coor = config.cities[city]
            date = moment().add(parseInt(daysFromNow), 'days').format(config.dateFormat)

      existOrgetAuthToken( (token) => {
        HttpsHelper.getHttpsRequest({
          host: config.evensi_path,
          path: config.api_version + '/event/map?token=' + token
            + '&date=' + date + '&lat=' + coor.lat + '&lng=' + coor.lng
            + '&distance=' + config.distance + '&tag=' + tags + '&fields=' + fields
        }, (result) => resolveReject(result, resolve, reject))
      })
    })
  }

}

module.exports = EvensiCli
