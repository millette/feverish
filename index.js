'use strict'

// npm
const divanator = require('divanator')

exports.deploy = divanator
exports.ddoc = (ddocPath) => divanator(ddocPath)
