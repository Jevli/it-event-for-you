const express = require('express'),
      router = express.Router(),
      EvensiCli = require('../services/evensicli'),
      evensicli = new EvensiCli(),
      config = require('../config.json').params,
      keywords = require('../assets/keywords'),
      mockData = require('../assets/mockEvents')


/* Tätä kutsutaan selaimesta: localhost:3000/readyEvents?daysFromNow=0&city=TRE*/
router.get('/readyEvents', (req, res, next) => {

  /**
  * TODO Lisää parametrit, anna lista tarvittavista
  * @param daysFromNow, is interger -10 - 30 from today
  * @param city, is one of configured cities
  * @param tags, is integer list of wanted tags
  * @param fields, is string list of wanted fields
  * tags ja fieldsit voi kova koodata tänne.
  */

  let fields = config.params.fields ? config.params.fields : ''
  let tags = config.params.tags ? config.params.tags : ''

  evensicli.getEventsOfDay(req.query.daysFromNow, req.query.city)
           .forEach( (event) => { // Tämä käy yksi event kerrallaan läpi
              // TODO Lisää rikastaminen tähän

              // TODO lopuksi tallentaen
           })
    res.send('Going throught all events from that day and saving them to database')
})

router.get('/', (req, res, next) => {
  const mockEvents = mockData.evensi
  mockEvents.forEach( (event) => {
    event.events.forEach( (ev) => {
      if (ev.id && ev.name && ev.location.name) {
        const newEvent = {}
        newEvent.eventid = ev.id
        newEvent.name = ev.name
        newEvent.location = getLocation(ev.location.name, ev.location.city)
        newEvent.start_date = getDate(ev.start_date)
        newEvent.end_date = getDate(ev.end_date)
        newEvent.description = ev.short_description ? ev.short_description : null
        newEvent.category_name = ev.category_name ? ev.category_name : null
        newEvent.category = ev.category ? ev.category : null
        newEvent.tag_name = ev.tag_name ? ev.tag_name : null
        // Tags are now changed from array to string
        newEvent.tag = ev.tag ? ev.tag.toString() : null
        newEvent.url = ev.url.url ? ev.url.url : null
        newEvent.keywords = searchKeywords(ev.name, ev.short_description)
        // TODO: insert into events table
        console.log(newEvent);
      } else {
        console.log("Invalid event info, could not save!");
      }
    })
  })
  addUsers(300)
})

const getDate = datetime => {
  let date = datetime ? datetime : null
  if (date === null) return null
  if (date.length < 19) return null
  date = date.substring(0,10) + " " + date.substring(11,19)
  return date
}

const getLocation = (location, city) => {
  let loc = location ? location : null
  loc = (loc !== null && city !== null && location !== city) ? loc + ", " : loc
  loc = (city && city !== location) ? loc + city : loc
  return loc
}

const searchKeywords = (name, desc) => {
  let keys = new Array()
  keywords.map( word => {
    if (name) {
      if (name.toLowerCase().indexOf(word) !== -1) {
        keys.push(word)
      }
    }
    if (desc) {
      if (desc.toLowerCase().indexOf(word) !== -1) {
        keys.push(word)
      }
    }
  })
  if (!keys.length) return null
  const uniqueKeys = keys.filter((v,i,a) => a.indexOf(v) === i)
  keys = uniqueKeys.length ? uniqueKeys.toString() : null
  return keys
}

const addUsers = count => {
  for (let i = 0; i < count; i++) {
    let words = []
    for (let j = 0; j < 10; j++) {
      const random = Math.floor(Math.random() * keywords.length)
      // unique??
      words.push(keywords[random])
    }
    console.log("user: ", i);
    console.log(words);
  }
}

module.exports = router;
