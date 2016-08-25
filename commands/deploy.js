'use strict'

module.exports = (mod, cb) => {
  const deployHandler = (argv) => mod.deploy(argv.ddocpath, argv.db)
    .then(cb)
    .catch(console.error)

  return {
    command: 'deploy <ddocpath>',
    describe: 'deploy ddoc (with attachments)',
    builder: {},
    handler: deployHandler
  }
}
