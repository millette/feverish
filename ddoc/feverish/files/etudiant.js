/* globals $ */
$(function () {
  'use strict'
  const student = $('body').data('student')
  $.getJSON('/_users/org.couchdb.user:' + student, function (userDoc) {
    const sums = {
      note: 0,
      ponderation: 0
    }
    const $tbody = $('tbody')
    var r
    var $me
    var $el1
    $('.exercice').hide()
    if (userDoc.corrections) {
      for (r in userDoc.corrections) {
        $me = $('#' + r)
        if (!$me.length) { continue }
        $('.json-note', $me).text(userDoc.corrections[r].note)
        $('.json-commentaires', $me).html(userDoc.corrections[r].commentaires)
        $('.json-ponderation', $me).text(userDoc.corrections[r].ponderation)
        $('.json-percent', $me).text(Math.round(100 * userDoc.corrections[r].note / userDoc.corrections[r].ponderation))
        $('.json-reference', $me).text(userDoc.corrections[r].reference ? 'référence' : '')
        if (userDoc._attachments && userDoc._attachments[r + '.jpg']) {
          $('.json-apercu img', $me).attr('src', '/_users/org.couchdb.user:' + student + '/' + r + '.jpg')
        } else {
          $('.json-apercu img', $me).remove()
        }
        $me.slideDown()
        sums.note += userDoc.corrections[r].note
        sums.ponderation += userDoc.corrections[r].ponderation
      }
      $el1 = $('<tr><th colspan="6">Total</th><th class="json-note">' +
        sums.note + '</th><th class="json-ponderation">' + sums.ponderation +
        '</th><th class="json-percent">' + Math.round(100 * sums.note / sums.ponderation) + '</th>')
      $tbody.append($el1)
    }
  })
})
