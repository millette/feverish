'use strict'

// core
// const url = require('url')

module.exports = (mod, cb) => {
  const addUsersHandler = (argv) => mod.addUsers(argv.db, argv.usersfile)
    .then(cb)
    .catch(console.error)

  return {
    command: 'add-users <usersfile>',
    describe: 'add users',
    handler: addUsersHandler
  }
}

module.exports.imp = (nano) => (dbFull, usersfile) => {
  // const db = url.resolve(dbFull, '/_users')
  // const elDb = nano(db)
  // return Promise.resolve(usersfile)
  throw new Error('Not implemented yet.')
  /*
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
  */
}
