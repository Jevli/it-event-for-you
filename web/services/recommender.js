const Database = require('../utils/dbConnection'),
      db = new Database(),
      keywords = require('../assets/keywords')

class Recommender {
  // returns 3 events with largest keyword count
  findITEvent(days) {
    let events = db.getFutureEvents(days)
    events = calculateKeywordCounts(events)
    const maxCounts = getMaxKeywordCounts(events)
    let first = []
    let second = []
    let third = []
    if (maxCounts.length > 0) first = getKeywordCountEvents(events, maxCounts[0])
    if (maxCounts.length > 1) second = getKeywordCountEvents(events, maxCounts[1])
    if (maxCounts.length > 2) third = getKeywordCountEvents(events, maxCounts[2])
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

  getKeywordCountEvents(events, keywordCount) {
    const tmp = []
    events.forEach( event => {
      if (event.count == keywordCount) {
        tmp.push(event)
      }
    })
    return tmp
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
