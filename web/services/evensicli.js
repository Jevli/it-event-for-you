const moment = require('moment')

const HttpsService = require('./httpsService'),
      config = require('../config.json').evensi

const resolveReject = (r, rs, rj) => r.status ? rs(r.data) : rj(r.error)

class EvensiCli {

  constructor() {
    this.https = new HttpsService()
    this.getAuthToken()
        .then( r => this.authToken = r )
        .catch( e => console.log('Auth failed: ' + e))
  }

  addAuthTokenIfMissing() {
    if (!this.authToken)
      this.getAuthToken()
        .then( r => this.authToken = r )
        .catch( e => console.log('Auth failed: ' + e))
  }

  getAuthToken() {
    return new Promise( (resolve, reject) => {
      this.https.getHttpsRequest({
        host: config.evensi_path,
        path: config.api_version + '/authenticate/app?appid='+ config.app_id +'&appsecret=' + config.app_secret
      }, (result) => result.status ? resolve(result.data[0].token) : reject(result.error.message))
    })
  }

  getAllTags(locale) {
    return new Promise( (resolve, reject) => {

      this.addAuthTokenIfMissing()

      this.https.getHttpsRequest({
        host: config.evensi_path,
        path: config.api_version + '/category/tag?token=' + this.authToken + '&locale=' + locale
      }, (result) => resolveReject(result, resolve, reject))
    })
  }

  /**
  * Fucktion is for getting all events of day.
  * @param daysFromNow, is interger -10 - 30 from today
  * @param city, is one of configured cities
  * @param tags, is integer list of wanted tags
  * @param fields, is string list of wanted fields
  */
  getEventsOfDay(daysFromNow, city, tags, fields) {
    return new Promise ( (resolve, reject) => {
      const coor = config.cities[city],
            date = moment()
                    .add(parseInt(daysFromNow), 'days')
                    .format(config.dateFormat)
      this.addAuthTokenIfMissing()

      this.https.getHttpsRequest({
        host: config.evensi_path,
        path: config.api_version + '/event/map?token=' + this.authToken
          + '&date=' + date + '&lat=' + coor.lat + '&lng=' + coor.lng
          + '&distance=' + config.distance + '&tag=' + tags + '&fields=' + fields
      }, (result) => result.status ? resolve(result.data) : reject(result.error))
    })
  }
}
module.exports = EvensiCli
