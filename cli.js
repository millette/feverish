#! /usr/bin/env node
'use strict'

// self
const pkg = require('./package.json')
const feverish = require('./')

// npm
const yargs = require('yargs')

const jsonlog = (o) => console.log(JSON.stringify(o, null, ' '))

const ddocHandler = (argv) => feverish.ddoc(argv.ddocpath)
  .then(jsonlog)
  .catch(console.error)

const deployHandler = (argv) => feverish.deploy(argv.ddocpath, argv.db)
  .then(jsonlog)
  .catch(console.error)

yargs
  .demand(1)
  .usage('Usage: $0 ...')
  .option('db', {
    describe: 'db url',
    default: process.env.npm_package_config_dburl || pkg.config.dburl,
    type: 'string'
  })
  .global('db')
  .version()
  .help()
  .epilog('copyright 2016')
  .command('ddoc <ddocpath>', 'get ddoc (without attachments)', {}, ddocHandler)
  .command('deploy <ddocpath>', 'deploy ddoc (with attachments)', {}, deployHandler)
  .argv
