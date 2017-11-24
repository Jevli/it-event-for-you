const https = require('https')

class EvensiCli {

  constructor() {

  }

  getAuthToken(url) {
    return new Promise( (resolve, reject) => {
      getHttpsRequest(url, (result) => {
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

  getHttpsRequest(url) {
      https.get(url, (res) => {
        let body = ''

        res.on('data', (d) => {
          body += d;
        })

        res.on('end', (d) => {
          return JSON.parse(body)
        })
      }).on('error', (e) => {
        return e;
      })
  }


}
module.exports = EvensiCli
