/* globals start, getRow, send */
'use strict'
module.exports = function (head, req, mocks) {
  const tpl = require('views/lib/templates')
  const studentMenu = function (row) {
    return '<li><a href="/score/' + row._id + '">Consulter mon résultat</a></li>'
  }
  const teacherMenu = function (row) {
    return [
      '<li><a href="/edit/' + row._id + '">Éditer</a></li>',
      '<li><a href="/corrections/' + row._id + '">Corriger</a></li>'
    ].join('')
  }

  if (!mocks) { mocks = { start: start, getRow: getRow, send: send } }
  start({ headers: { 'Content-Type': 'text/html; charset=utf-8' } })
  let row
  const rows = []
  while ((row = getRow())) { rows.push(row.doc) }
  send(tpl.exercices({ userMenu: req.userCtx.roles.indexOf('teacher') === -1 ? studentMenu : teacherMenu, rows: rows }))
}
