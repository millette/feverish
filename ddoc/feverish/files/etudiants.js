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
        const id = 'confirm-delete-' + u.replace(/ /g, '')
        $tableBody.append([
          '<tr data-uid="' + u + '"><td>' + u + '</td>',
          '<td><a href="/etudiant/' + u + '">consulter</a></td>',
          '<td>',
          '<button type="button" class="button warning" data-toggle="' + id + '">effacer</button>',
          '<div class="dropdown-pane top" id="' + id + '" data-dropdown data-auto-focus="true" data-close-on-click="true" data-position-class="top">',
          '<button type="button" class="confirm button alert">Effacer ' + u + '</button>',
          '</div>',
          '</td></tr>'
        ].join(''))
      })
    $tableBody.foundation()
  }
  const query = {
    include_docs: true,
    startkey: '"org.couchdb.user:"',
    endkey: '"org.couchdb.user:\ufff0"'
  }
  $.getJSON('/_users/_all_docs', query, fn)

  $table.on('click', 'button.confirm', function (ev) {
    const $row = $(this).parents('tr')
    const uid = $row.data('uid')
    $row.fadeOut(500, function () {
      $row.remove()
      console.log('clicked - removed (FAKE)', uid)
    })
  })
})
