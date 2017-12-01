const Database = require('./database-sevice'),
      db = new Database(),
      keywords = require('../assets/keywords')

class Recommender {
  findRecommendable(userId) {
    // user's keywords
    const userKeywords = db.getUserKeywords(userId)
    // past events user has been to
    const pastEvents = db.getPastEvents(userId)
    // TODO: loop the past events
    // (tags and) keywords from those events
    const eventMetaData = db.getEventMetaData(id)
    // TODO: figure out how to select the most similar event?
    // event's data
    const eventInfo = db.getEventData(id)
    return eventInfo
  }

  findITEvent(days) {
    const events = db.getFutureEvents(days)
    // what format are the events?
    // TODO: calculate length of event's keyword list
    // TODO: recommend the event with longest keyword list
    const eventInfo = db.getEventData(id)
    return eventInfo
  }
}

module.exports = Recommender
