const HttpsService = require('./httpsService')
class EvensiCli {

  constructor() {
    this.https = new HttpsService()
  }

  getAuthToken(url) {
    return new Promise( (resolve, reject) => {
      this.https.getHttpsRequest(url, (result) => {
        if(result.status) {
          console.log('Auth success')
          resolve(result.data[0].token)
        } else {
          console.log('Error on authentication: ' + result.error.message)
          reject(result.error.message)
        }
      })
    })
  }

  getEventsOfDay(day, city, fields) {
    return []
  }
}
module.exports = EvensiCli
