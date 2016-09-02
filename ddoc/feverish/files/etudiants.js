/* globals $ */
$(function () {
  'use strict'

  const $table = $('table#studentlist')
  const $tableBody = $('tbody', $table)
  const fn = function (data) {
    data.rows
      .filter(function (row) {
        return row.doc.roles.indexOf('teacher') === -1 && row.doc.roles.indexOf('_admin') === -1
      })
      .map(function (row) { return row.id.split(':')[1] })
      .forEach(function (u) {
        $tableBody.append('<tr data-uid="' + u + '"><td>' + u + '</td><td><a href="/etudiant/' + u + '">consulter</a></td><td><button type="button" class="button alert">effacer</button></td></tr>')
      })
  }
  const query = {
    include_docs: true,
    startkey: '"org.couchdb.user:"',
    endkey: '"org.couchdb.user:\ufff0"'
  }
  $.getJSON('/_users/_all_docs', query, fn)
})
