/* globals start, getRow, send */
'use strict'
module.exports = function (head, req, mocks) {
  const tpl = require('views/lib/templates')
  if (!mocks) { mocks = { start: start, getRow: getRow, send: send } }
  start({ headers: { 'Content-Type': 'text/html; charset=utf-8' } })
  let row
  const rows = []
  while ((row = getRow())) {
    delete row.doc.description
    delete row.doc.descriptif
    row.doc.h3 = true
    rows.push(row)
  }
  req.userCtx.student = req.query.student || req.userCtx.name
  req.userCtx.self = !req.query.student
  req.userCtx.rows = rows
  send(tpl.etudiant(req.userCtx))
}
