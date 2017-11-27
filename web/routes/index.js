const express = require('express'),
      router = express.Router(),
      EvensiCli = require('../services/evensicli'),
      evensicli = new EvensiCli()


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
  const tags = "66,17,69,20,13,117,105,70"
  const fields = "name,short_description,start_date,end_date,location,category,category_name,tag,tag_name,url"

  evensicli.getEventsOfDay(req.query.daysFromNow, req.query.city)
           .forEach( (event) => { // Tämä käy yksi event kerrallaan läpi
              // TODO Lisää rikastaminen tähän

              // TODO lopuksi tallentaen
           })
    res.send('Going throught all events from that day and saving them to database')
})

// PR for commenting stuff
router.get('/', (req, res, next) => {
  mockEvents.forEach( (event) => {
    event.events.forEach( (ev) => {
      const id = ev.id ? ev.id : null
      const name = ev.name ? "\"" + ev.name + "\"" : null
      const start = getDate(ev.start_date)
      const end = getDate(ev.end_date)
      const desc = ev.short_description ? "\"" + ev.short_description + "\"" : null
      const loc = getLocation(ev.location.name, ev.location.city)
      const category_name = ev.category_name ? "\"" + ev.category_name + "\"" : null
      const category = ev.category ? ev.category : null
      const tag_names = ev.tag_name ? "\"" + ev.tag_name + "\"" : null
      // Tags are now changed from array to string
      const tags = ev.tag ? "\"" + ev.tag.toString() + "\"": null
      const url = ev.url.url ? "\"" + ev.url.url + "\"" : null
      const keywords = searchKeywords(name, desc)
      // TODO: insert into events table
      if (id && loc && name) {
        const sql = "INSERT INTO events (eventid,location,start_date,end_date,description,category_name,category,tag_name,tag,url,keywords,name) VALUES(" + id + "," + loc + "," + start + "," + end + "," + desc + "," + category_name + "," + category + "," + tag_names + "," + tags + "," + url + "," + keywords + "," + name + ");"
        console.log(sql);
      } else {
        console.log("Invalid event info, could not save!");
      }
    })
  })
})

getDate = datetime => {
  let date = datetime ? datetime : null
  if (date === null) return null
  if (date.length < 19) return null
  date = date.substring(0,10) + " " + date.substring(11,19)
  date = "\"" + date + "\""
  return date
}

getLocation = (location, city) => {
  let loc = location ? location : null
  loc = (loc !== null && city !== null && location !== city) ? loc + ", " : loc
  loc = (city && city !== location) ? loc + city : loc
  if (loc === null) return loc
  loc = "\"" + loc + "\""
  return loc
}

searchKeywords = (name, desc) => {
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
  keys = uniqueKeys.length ? "\"" + uniqueKeys.toString() + "\"" : null
  return keys
}

module.exports = router;

/* KEYWORDS */
const keywords = [
  '.net',
  'amazon',
  'analytics',
  'angular',
  'api',
  'app',
  'application',
  'ar',
  'architecture',
  'aws',
  'back-end',
  'beta',
  'blackbox',
  'bootstrap',
  'browser',
  'bug',
  'c',
  'clojure',
  'cobol',
  'computer',
  'c++',
  'c#',
  'data mining',
  'database',
  'design',
  'developer',
  'developing',
  'front-end',
  'full-stack',
  'functional',
  'hackathon',
  'haskell',
  'ide',
  'internet',
  'it',
  'java',
  'javascript',
  'kernel',
  'laravel',
  'legacy',
  'linux',
  'lisp',
  'mac',
  'malware',
  'mongodb',
  'mysql',
  'open source',
  'php',
  'postgresql',
  'program',
  'programming',
  'python',
  'react',
  'react native',
  'rest',
  'ruby',
  'ruby on rails',
  'script',
  'security',
  'server',
  'shell',
  'slush',
  'software',
  'sql',
  'start up',
  'startup',
  'testing',
  'vr',
  'vue.js',
  'web',
  'windows',
  'ui',
  'ux'
]

/* MOCK DATA */
const mockEvents = [
  {
    "lat":"60.203101421243",
    "lng":"24.936279047871",
    "events":[{
      "id":"210718110",
      "name":"Italian mission to Slush 2017",
      "start_date":"2017-11-30T09:00:00+02:00",
      "end_date":"2017-12-01T18:00:00+02:00",
      "location":{
        "name":"Messukeskus",
        "street":"Messuaukio 1",
        "city":"Helsinki",
        "state":null,
        "zip":"520",
        "nation":"Finland",
        "latitude":"60.203101421243",
        "longitude":"24.936279047871"
      },
      "tag":["117"],
      "url":{"url":"https://www.evensi.com/210718110"},
      "category_name":"Fairs",
      "category":"4"
    },{
      "id":"229146199",
      "name":"XcitED",
      "start_date":"2017-11-30T14:00:00+03:00",
      "end_date":"2017-11-30T19:00:00+03:00",
      "location":{
        "name":"Messukeskus",
        "street":"Messuaukio 1",
        "city":"Helsinki",
        "state":null,
        "zip":"520",
        "nation":"Finland",
        "latitude":"60.203101421243",
        "longitude":"24.936279047871"
      },
      "tag":["17","117"],
      "short_description":"Sulla scia del notevole successo delle precedenti edizioni, l’Ambasciata d’Italia in Helsinki e l’Ufficio ICE di Stoccolma presentano la prossima kermesse mondiale di start-up ed innovazione “Slush 2017”, che si terrà a Helsinki dal 30 novembre al 1 dicembre 2017. \nQuesta sezione della pagina Facebo...",
      "url":{"url":"https://www.evensi.com/229146199"},
      "category_name":"Fairs",
      "category":"4"
    },{
      "id":"235126395",
      "name":"Startup Sauna Demo Day Fall ‘17",
      "start_date":"2017-11-30T16:30:00+02:00",
      "end_date":"2017-11-30T18:00:00+02:00",
      "location":{
        "name":"Messukeskus",
        "street":"Messuaukio 1",
        "city":"Helsinki",
        "state":null,
        "zip":"520",
        "nation":"Finland",
        "latitude":"60.203101421243",
        "longitude":"24.936279047871"},
        "tag":["1","17","117"],
        "short_description":"There are accelerators and Demo Days. Startup Sauna’s Demo Days aren't your usual snoozefest; they’re a celebration of early-stage startups on their way to becoming scaleups, and we are good at celebrating. \n \nEurasia’s most intensive accelerator, Startup Sauna, brings its Demo Day to Slush 2017 to showcase the most impressing early-stage founders found from Finland, Russia, Ukraine, Switzerland, UK, and South Korea.\n \nStartup Sauna’s cohorts go through a military boot camp like experience before they climb on the stage. On November 30th, we celebrate the fact that the founders have spent the ...",
        "url":{"url":"https://www.evensi.com/235126395"},
        "category_name":"Fairs",
        "category":"4"
      }
    ]
  },{
    "lat":"60.20283300000001",
    "lng":"24.93611839999994",
    "events":[{
      "id":"226000393",
      "name":"DO! GOES SLUSH",
      "start_date":"2017-11-30T10:00:00+02:00",
      "end_date":"2017-12-01T17:00:00+02:00",
      "location":{
        "name":"Helsinki",
        "street":"Messuaukio 1,",
        "city":"Helsinki",
        "state":null,
        "zip":"520",
        "nation":"Finland",
        "latitude":"60.202833",
        "longitude":"24.9361184"
      },
      "tag":["6","9","17","69","117","125"],
      "short_description":"Compete in our ‘DO! goes SLUSH'-competition and win a ticket for SLUSH!\n\nSLUSH is the biggest tech start-up and investors conference in Europe and gathers more than 15 000 tech entrepreneurs, VC's and journalists. It takes place in Helsinki, Finland on November 30 - December 1st, 2017. Slush is the focal point for startups and tech talent to meet with top-tier international investors, executives and media. \n\nDO! will pay the conference passes for 2 UGent student-entrepreneurs (early-stage startup passes).\n\nTravel, accomodation and food and drinks are not covered, but if you travel together you...",
      "url":{"url":"https://www.evensi.com/226000393"},
      "category_name":"Fairs",
      "category":"4"
    }],
  },
]
