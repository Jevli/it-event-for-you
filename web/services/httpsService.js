const https = require('https')

class HttpsService {
  constructor() {
    
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
module.exports = HttpsService
