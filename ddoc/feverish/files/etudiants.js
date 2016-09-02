/* globals $ */
$(function () {
  'use strict'

  const $tableBody = $('table#studentlist tbody')
  const fn = function (data) {
    data.rows
      .filter(function (row) {
        return row.doc.roles.indexOf('teacher') === -1 && row.doc.roles.indexOf('_admin') === -1
      })
      .forEach(function (row) {
        const u = row.id.split(':')[1]
        const id = 'confirm-delete-' + u.replace(/ /g, '')
        $tableBody.append([
          '<tr data-rev="' + row.value.rev + '" data-uid="' + u + '"><td>' + u + '</td>',
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

  $tableBody.on('click', 'button.confirm', function (ev) {
    $(this).parents('.dropdown-pane').foundation('close')
    const $row = $(this).parents('tr').addClass('callout alert')
    const uid = $row.data('uid')
    const rev = $row.data('rev')
    $.ajax({
      url: '/_users/org.couchdb.user:' + uid + '?rev=' + rev,
      method: 'DELETE',
      error: function () { $row.addClass('callout secondary') },
      success: function () { $row.fadeOut(500, function () { $row.remove() }) }
    })
  })
})
