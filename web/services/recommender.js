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
    const first = []
    const second = []
    const third = []
    events.forEach( event => {
      if (maxCounts.length > 0 && event.count == maxCounts[0]) {
        first.push(event)
      } else if (maxCounts.length > 1 && event.count == maxCounts[1]) {
        second.push(event)
      } else if (maxCounts.length > 2 && event.count == maxCounts[2]) {
        third.push(event)
      }
    })
    // TODO: fetch event data if not fetched in earlier query
    // const eventInfo = db.getEventData(id)
    return get3First(first, second, third)
  }

  calculateKeywordCounts(events) {
    events.forEach( event => {
      event.count = event.keywords.split(',').length
    })
    return events
  }

  get3First(first, second, third) {
    if (first.length == 3) return first
    if (first.length > 3) return first.slice(0,3)
    while (first.length < 3) {
      if (second.length > 0) {
        first.push(second.shift())
      } else if (third.length > 0) {
        first.push(third.shift())
      } else return first
    }
    return first
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
