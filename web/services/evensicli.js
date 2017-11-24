const HttpsService = require('./HttpsService')
class EvensiCli {

  constructor() {
    const https = new HttpsService()
  }

  getAuthToken(url) {
    return new Promise( (resolve, reject) => {
      this.getHttpsRequest(url, (result) => {
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

  getHttpsRequest(url, cb) {
      https.get(url, (res) => {
        let body = ''

        res.on('data', (d) => {
          body += d;
        })

        res.on('end', (d) => {
          cb(JSON.parse(body))
        })
      }).on('error', (e) => {
        cb(e)
      })
  }


}
module.exports = EvensiCli
