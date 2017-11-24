var express = require('express');
var router = express.Router();
const EvensiCli = require('../services/evensicli')
const evensicli = new EvensiCli()

/* GET home page. */
router.get('/readyEvents/:day', (req, res, next) => {

  let day = req.params.day
  // TODO Nouda eventit
  evensicli.getEventsOfDay(/*parametrit*/)
           .forEach( () => {
              // TODO Käy yksi kerrallaan läpi "rikastoaen"
              // TODO lopuksi tallentaen
           }) //jokooine


  res.render('index', { title: 'Express' });
})

module.exports = router;
