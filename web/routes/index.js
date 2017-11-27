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
  // some changes
  evensicli.getEventsOfDay(req.query.daysFromNow, req.query.city)
           .forEach( (event) => { // Tämä käy yksi event kerrallaan läpi
              // TODO Lisää rikastaminen tähän

              // TODO lopuksi tallentaen
           })
    res.send('Going throught all events from that day and saving them to database')
})

module.exports = router;
