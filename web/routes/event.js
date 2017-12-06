const express = require('express'),
      router = express.Router(),
      config = require('../config.json').params,
      EvensiCli = require('../utils/evensi'),
      Event = require('../models/event')

router.get('/getAllTags/', (req, res, next) => {

  evensicli.getAllTags(req.query.locale)
           .then( result => res.json(result) )
           .catch( err => res.json(err) )
})

/* Tätä kutsutaan selaimesta: localhost:3000/readyEvents?daysFromNow=0&city=TRE*/
router.get('/readyEvents', (req, res, next) => {

  const fields = config.fields ? config.fields : ''
  const tags = config.tags ? config.tags : ''

  EvensiCli.getEventsOfDay(req.query.daysFromNow, req.query.city, tags, fields)
           .then( events => {
             events.forEach( event => {
               event['events'].forEach( ev => {
                 if (ev.id && ev.name && ev.location.name) {
                   const newEvent = {
                     'eventId': ev.id,
                     'name': ev.name,
                     'location': getLocation(ev.location.name, ev.location.city),
                     'start_date': getDate(ev.start_date),
                     'end_date': getDate(ev.end_date),
                     'description': ev.short_description ? ev.short_description : null,
                     'category_name': ev.category_name ? ev.category_name : null,
                     'category': ev.category ? ev.category : null,
                     'tag_name': ev.tag_name ? ev.tag_name : null,
                     'tag': ev.tag ? ev.tag.toString() : null,
                     'url': ev.url.url ? ev.url.url : null,
                     'keywords': searchKeywords(ev.name, ev.short_description)
                   }

                   Event.saveEvent(newEvent, (err, result) => {
                     err ? console.log(err) : console.log('Saved event: ' + result.insertId)
                   })

                 } else {
                   console.log('Invalid event info, could not save!')
                 }
               })

             })
           }).catch(err => console.log('Err: '+ err))
           res.send("Poo")
})

router.get('/', (req, res, next) => {
  Event.getAllEvents( (err, result) => {
    err ? res.json(err) : res.json(result)
  })
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

module.exports = router
