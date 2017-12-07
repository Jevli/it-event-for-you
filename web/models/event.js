const db = require('../utils/dbConnection')

const Events = {
  saveEvent: (event, cb) => db.create('events', event, cb),
  getAllEvents: (cb) => db.get('events', cb),
  getEventById: (id, cb) => db.get('events', 'eventid', id, cb)
}

module.exports = Events
