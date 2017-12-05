const express = require('express'),
      router = express.Router(),
      EvensiCli = require('../services/evensicli'),
      evensicli = new EvensiCli(),
      config = require('../config.json').params,
      keywords = require('../assets/keywords'),
      mockData = require('../assets/mockEvents')


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
