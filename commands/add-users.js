'use strict'

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
  throw new Error('Not implemented yet.')
}
