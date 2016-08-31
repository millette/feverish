/* globals start, getRow, send */
'use strict'
module.exports = function (head, req, mocks) {
  if (!mocks) { mocks = { start: start, getRow: getRow, send: send } }
  start({ headers: { 'Content-Type': 'application/json; charset=utf-8' } })
  let row
  const rows = []
  while ((row = getRow())) { rows.push(row) }
  send(JSON.stringify(rows))
}
