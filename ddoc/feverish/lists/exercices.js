/* globals start, getRow, send */
'use strict'
module.exports = function (head, req, mocks) {
  const tpl = require('views/lib/templates')
  const studentMenu = function (row) {
    return '<a class="button success" href="/score/' + row._id + '">Consulter mon résultat</a>'
  }
  const teacherMenu = function (row) {
    return [
      '<a class="button" href="/edit/' + row._id + '">Éditer</a>',
      '<a class="button success" href="/corrections/' + row._id + '">Corriger</a>',
      '<button type="button" class="button warning" data-toggle="' + row._id + '">Effacer</button>',
      '<div class="dropdown-pane top" id="' + row._id,
      '" data-dropdown data-auto-focus="true" data-close-on-click="true" data-position-class="top">',
      '<button type="button" class="confirm-delete button alert" data-exid="' + row._id + '" data-exrev="' + row._rev + '">Effacer ' + row.title + '</button>',
      '</div>'
    ].join('')
  }

  if (!mocks) { mocks = { start: start, getRow: getRow, send: send } }
  start({ headers: { 'Content-Type': 'text/html; charset=utf-8' } })
  let row
  const rows = []
  while ((row = getRow())) { rows.push(row.doc) }
  req.userCtx.userMenu = req.userCtx.roles.indexOf('teacher') === -1 ? studentMenu : teacherMenu
  req.userCtx.rows = rows
  send(tpl.exercices(req.userCtx))
}
