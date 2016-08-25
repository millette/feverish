'use strict'

// npm
const divanator = require('divanator')
const nano = require('nano')

exports.deploy = divanator
exports.ddoc = (ddocPath) => divanator(ddocPath)

exports.addUser = require('./commands/add-user').imp(nano)

/*
exports.addUsers = (db, users) => {
}
*/
