'use strict'

// core
const url = require('url')

module.exports = (mod, cb) => {
  const addUserHandler = (argv) => mod.addUser(argv.db, argv.name, argv.password)
    .then(cb)
    .catch(console.error)

  return {
    command: 'add-user <name> <password>',
    describe: 'add a user',
    handler: addUserHandler
  }
}

module.exports.imp = (nano) => (dbFull, username, password) => {
  const db = url.resolve(dbFull, '/_users')
  const elDb = nano(db)
  return new Promise((resolve, reject) => {
    const userDoc = {
      _id: `org.couchdb.user:${username}`,
      name: username,
      password: password,
      type: 'user',
      roles: ['student']
    }
    elDb.insert(userDoc, (err, ok) => err ? reject(new Error(err)) : resolve(ok))
  })
}
