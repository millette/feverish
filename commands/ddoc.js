'use strict'

module.exports = (mod, cb) => {
  const ddocHandler = (argv) => mod.ddoc(argv.ddocpath)
    .then(cb)
    .catch(console.error)

  return {
    command: 'ddoc <ddocpath>',
    describe: 'get ddoc (without attachments)',
    handler: ddocHandler
  }
}
