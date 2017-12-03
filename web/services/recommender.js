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

  // returns 3 events with largest keyword count
  findITEvent(days) {
    let events = db.getFutureEvents(days)
    events = calculateKeywordCounts(events)
    const maxCounts = getMaxKeywordCounts(events)
    let best3 = []
    events.forEach( event => {
      if (maxCounts.length > 0 && event.count == maxCounts[0]) {
        best3.unshift(event)
      } else if (maxCounts.length > 1 && event.count == maxCounts[1]) {
        best3.push(event)
      } else if (maxCounts.length > 2 && event.count == maxCounts[2]) {
        best3.push(event)
      }
    })
    if (best3.length > 3) {
      best3 = best3.slice(0,3)
    }
    // TODO: fetch event data if not fetched in earlier query
    // const eventInfo = db.getEventData(id)
    return best3
  }

  calculateKeywordCounts(events) {
    events.forEach( event => {
      event.count = event.keywords.split(',').length
    })
    return events
  }

  getMaxKeywordCounts(events) {
    let counts = []
    events.forEach( event => {
      counts.push(event.count)
    })
    counts = counts.filter((v, i, a) => a.indexOf(v) === i)
    counts.sort(function(a, b){return b-a})
    return counts
  }
}

module.exports = Recommender
