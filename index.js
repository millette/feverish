'use strict'

const divanator = require('divanator')

divanator('ddoc/feverish', 'http://localhost:5984/bobo')
  .then(console.log)
  .catch(console.error)
