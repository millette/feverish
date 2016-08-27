/* globals start, getRow, send */
'use strict'
module.exports = function (head, req, mocks) {
  const tpl = require('views/lib/templates')
  if (!mocks) { mocks = { start: start, getRow: getRow, send: send } }
  start({ headers: { 'Content-Type': 'text/html; charset=utf-8' } })
  let row
  const rows = []
  while ((row = getRow())) { rows.push(row.doc) }
  send(tpl.exercices({ rows: rows }))
}
