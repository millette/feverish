'use strict'
import test from 'ava'
import fn from './'
import ddoc from './commands/ddoc'
import deploy from './commands/deploy'
import addUser from './commands/add-user'
import addUsers from './commands/add-users'

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

test('add user', async t => {
  const mod = { addUser: (db, username, password) => Promise.resolve(`db: ${db}; ${username}:${password}`) }
  const result = addUser(mod, (o) => o)
  t.is(result.command, 'add-user <name> <password>')
  const h = await result.handler({
    db: 'hoho',
    name: 'joe',
    password: 'blo'
  })
  t.is(h, 'db: hoho; joe:blo')
})

test('add user imp', async t => {
  const mockNano = (db) => {
    return {
      db: 'yup',
      name: db,
      insert: (doc, cb) => {
        cb(null, doc)
      }
    }
  }
  const au = addUser.imp(mockNano)
  const result = await au('http://localhost:5984/la-db', 'joe', 'blo')
  t.is(result.name, 'joe')
  t.is(result.password, 'blo')
})

test('add users', async t => {
  const mod = { addUsers: (db, usersfile) => Promise.resolve(`db: ${db}; ${usersfile}`) }
  const result = addUsers(mod, (o) => o)
  t.is(result.command, 'add-users <usersfile>')
  const h = await result.handler({
    db: 'hoho',
    usersfile: 'joe-file-of-users.txt'
  })
  t.is(h, 'db: hoho; joe-file-of-users.txt')
})

/*
test.only('add users imp', async t => {
  const mockNano = (db) => {
    return {
      db: 'yup',
      name: db,
      insert: (doc, cb) => {
        cb(null, doc)
      }
    }
  }

  const au = addUsers.imp(mockNano)
  const result = await au('http://localhost:5984/la-db', 'un-fichier-des-users.txt')
  console.log(result)
  t.is(result.name, 'joe')
  t.is(result.password, 'blo')
})
*/

test('add users imp (not implemented)', async t => {
  const mockNano = (db) => {
    return {
      db: 'yup',
      name: db,
      insert: (doc, cb) => {
        cb(null, doc)
      }
    }
  }
  const au = addUsers.imp(mockNano)
  await t.throws(() => au('http://localhost:5984/la-db', 'un-fichier-des-users.txt'), 'Not implemented yet.')
})
