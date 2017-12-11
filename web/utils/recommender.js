const db = require('../utils/dbConnection'),
      Events = require('../models/event.js'),
      keywords = require('../assets/keywords')

const calculateKeywordCounts = (events) => {
  events.forEach( event => {
    event.count = event.keywords.split(',').length
  })
  return events
}

const get3First = (first, second, third) => {
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

const getKeywordCountEvents = (events, keywordCount) => {
  const tmp = []
  events.forEach( event => {
    if (event.count == keywordCount) {
      tmp.push(event)
    }
  })
  return tmp
}

const getMaxKeywordCounts = (events) => {
  let counts = []
  events.forEach( event => {
    counts.push(event.count)
  })
  counts = counts.filter((v, i, a) => a.indexOf(v) === i)
  counts.sort(function(a, b){return b-a})
  return counts
}

const getResults = (cb, result) => {
  const events = calculateKeywordCounts(result)
  const maxCounts = getMaxKeywordCounts(events)
  if (maxCounts.length > 0) first = getKeywordCountEvents(events, maxCounts[0])
  if (maxCounts.length > 1) second = getKeywordCountEvents(events, maxCounts[1])
  if (maxCounts.length > 2) third = getKeywordCountEvents(events, maxCounts[2])
  cb(get3First(first, second, third))
}

let first = []
let second = []
let third = []

const Recommender = {
  // returns 3 events with largest keyword count
  findITEvent: cb => {
    Events.getFutureEvents( (err, result) => {
      err ? cb(err) : getResults(cb, result)
    })
  },
}

module.exports = Recommender
