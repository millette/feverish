/* globals start, getRow, send */
'use strict'
module.exports = function (head, req, mocks) {
  const tpl = require('views/lib/templates')

  const studentMenu = function (row) {
    return '<td><a class="label success" href="/score/' + row._id + '">Consulter mon résultat</a></td>'
  }

  const teacherMenu = function (row) {
    return [
      '<td><a class="label" href="/edit/' + row._id + '">Éditer</a></td>',
      '<td><a class="label success" href="/corrections/' + row._id + '">Corriger</a></td>',
      '<td><div class="label warning" data-toggle="' + row._id + '">Effacer</div></td>',
      '<td><div class="dropdown-pane top" id="' + row._id,
      '" data-dropdown data-auto-focus="true" data-close-on-click="true" data-position-class="top">',
      '<button type="button" class="confirm-delete button alert" data-exid="' + row._id + '" data-exrev="' + row._rev + '">Effacer ' + row.title + '</button>',
      '</div></td>'
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
