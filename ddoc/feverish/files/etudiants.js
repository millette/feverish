/* globals $, app */
$(function () {
  'use strict'
  var allUsers
  const $tableBody = $('table#studentlist tbody')
  const fixer = $tableBody.data('fixer')
  const fn = function (data) {
    allUsers = data.rows.filter(function (row) { return row.doc.roles.indexOf('teacher') === -1 && row.doc.roles.indexOf('_admin') === -1 })
    allUsers.sort(app.userSorter).forEach(function (row, i) {
      const u = row.id.split(':')[1]
      const id = 'confirm-delete-' + u.replace(/ /g, '')
      $tableBody.append([
        '<tr data-rowi="' + i + '" data-rev="' + row.value.rev + '" data-uid="' + u + '">',
        (fixer
          ? ('<td>' + u + ' <small>' + (row.doc.opaque || '<button class="fix-opaque button secondary" type="button">fix opaque</button>') + '</small></td>')
          : ('<td>' + u + '</td>')
        ),
        '<td><a href="/etudiant/' + u + '">consulter</a></td>',
        '<td>',
        '<div class="label warning" data-toggle="' + id + '">effacer</div>',
        '<div class="dropdown-pane top" id="' + id,
        '" data-dropdown data-auto-focus="true" data-close-on-click="true" data-position-class="top">',
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

  $tableBody.on('click', 'button.fix-opaque', function (ev) {
    const $small = $(this).parent('small')
    const $row = $(this).parents('tr').addClass('callout alert')
    const rowi = $row.data('rowi')
    $.getJSON('/_uuids', function (uuids) {
      allUsers[rowi].doc.opaque = uuids.uuids[0]
      $.ajax({
        url: '/_users/' + allUsers[rowi].id,
        dataType: 'json',
        data: JSON.stringify(allUsers[rowi].doc),
        method: 'PUT',
        error: function () { console.log('error, hmm...') },
        success: function (userDoc) {
          $row.removeClass('callout alert')
          $small.text(uuids.uuids[0])
        }
      })
    })
  })

  $tableBody.on('click', 'button.confirm', function (ev) {
    $(this).parents('.dropdown-pane').foundation('close')
    const $row = $(this).parents('tr').addClass('callout alert')
    const uid = $row.data('uid')
    const rev = $row.data('rev')
    // TODO: delete rendus de référence
    $.ajax({
      url: '/_users/org.couchdb.user:' + uid + '?rev=' + rev,
      method: 'DELETE',
      error: function () { $row.removeClass('alert').addClass('secondary') },
      success: function () { $row.fadeOut(500, function () { $row.remove() }) }
    })
  })
})
