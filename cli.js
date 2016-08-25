#! /usr/bin/env node
'use strict'

// self
const pkg = require('./package.json')
const feverish = require('./')

// npm
const yargs = require('yargs')
const updateNotifier = require('update-notifier')

const jsonlog = (o) => console.log(JSON.stringify(o, null, ' '))

updateNotifier({pkg}).notify()

yargs
  .epilog(`${pkg.name} ${pkg.version} ${JSON.stringify(pkg.author)} ${pkg.license}`)
  .demand(1)
  .option('db', {
    describe: 'db url',
    default: process.env.npm_package_config_dburl || pkg.config.dburl,
    type: 'string'
  })
  .global('db')
  .version()
  .help()
  .command(require('./commands/ddoc')(feverish, jsonlog))
  .command(require('./commands/deploy')(feverish, jsonlog))
  .argv
