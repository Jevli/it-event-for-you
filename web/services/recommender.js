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

  /* Should method only return the first event with largest
   * keyword count? Or return all the events with the largest
   * keyword count
  **/
  findITEvent(days) {
    const events = db.getFutureEvents(days)
    const best
    const count = 0
    // if events in array
    events.map( event => {
      const keywords = event.keywords
      const wordcount = keywords.split(',').length
      if (wordcount > count) {
        best = event
        count = wordcount
      }
    })

    // TODO: fetch event data if not fetched in earliier query
    // const eventInfo = db.getEventData(id)
    return best
  }
}

module.exports = Recommender
