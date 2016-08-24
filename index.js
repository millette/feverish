'use strict'

const divanator = require('divanator')

divanator('ddoc/feverish', process.argv[2])
  .then(console.log)
  .catch(console.error)
