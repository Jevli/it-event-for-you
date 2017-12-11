const db = require('../utils/dbConnection')
      moment = require('moment')

const Events = {
  saveEvent: (event, cb) => db.create('events', event, cb),
  getAllEvents: (cb) => db.get('events', cb),
  getEventById: (id, cb) => db.get('events', 'eventid', id, cb),
  getFutureEvents: (cb) => {
    db.get('events', (err, result) => {
      if (err) cb(err)

       cb(null, result.filter( event => moment(event.start_date).diff(moment(), 'days') >= 0))
    })
  },
  deleteAll: (cb) => db.delete('events', cb)
}

module.exports = Events
