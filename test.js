'use strict'
import test from 'ava'
import fn from './'
import ddoc from './commands/ddoc'
import deploy from './commands/deploy'

test('go', t => {
  const result = Object.keys(fn)
  t.not(result.indexOf('ddoc'), -1)
  t.not(result.indexOf('deploy'), -1)
})

test('ddoc', async t => {
  const mod = { ddoc: (p) => Promise.resolve(`path: ${p}`) }
  const result = ddoc(mod, (o) => o)
  t.is(result.command, 'ddoc <ddocpath>')
  const h = await result.handler({ ddocpath: 'here' })
  t.is(h, 'path: here')
})

test('deploy', async t => {
  const mod = { deploy: (p, db) => Promise.resolve(`path: ${p}; db: ${db}`) }
  const result = deploy(mod, (o) => o)
  t.is(result.command, 'deploy <ddocpath>')
  const h = await result.handler({ db: 'hoho', ddocpath: 'here' })
  t.is(h, 'path: here; db: hoho')
})
