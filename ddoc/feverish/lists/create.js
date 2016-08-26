/* globals start, getRow, send */
'use strict'
module.exports = function (head, req, mocks) {
  const tpl = require('views/lib/templates')
  if (!mocks) { mocks = { start: start, getRow: getRow, send: send } }
  const sortedRows = (order) => {
    const themeSorter = (a, b) => {
      if (order !== 'alpha') {
        // first, sort by value in descending order
        if (a.value > b.value) { return -1 }
        if (a.value < b.value) { return 1 }
      }
      // next, sort by key alphabetically in ascending order
      if (a.key > b.key) { return 1 }
      // no duplicates, keys will always be different
      return -1
    }
    let row
    const rows = []
    while ((row = getRow())) { rows.push(row) }
    return rows.sort(themeSorter)
  }
  const rows = sortedRows(req.query.order)
  start({ headers: { 'Content-Type': 'text/html; charset=utf-8' } })
  tpl.hiRow = (row) => `<option value="${row.key}">${row.key} (${row.value})</option>`

  send(tpl.hi({ rows: rows }))
  // send('<pre>' + JSON.stringify(rows, null, ' ') + '</pre>')
}
