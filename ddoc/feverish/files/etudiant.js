/* globals $ */
$(function () {
  'use strict'
  const student = $('body').data('student')
  $.getJSON('/_users/org.couchdb.user:' + student, function (userDoc) {
    var r
    var $me
    $('.exercice').hide()
    if (userDoc.corrections) {
      for (r in userDoc.corrections) {
        $me = $('#' + r)
        $('.json-note', $me).text(userDoc.corrections[r].note)
        $('.json-ponderation', $me).text(userDoc.corrections[r].ponderation)
        $('.json-percent', $me).text(Math.round(100 * userDoc.corrections[r].note / userDoc.corrections[r].ponderation))
        $('.json-reference', $me).text(userDoc.corrections[r].reference ? 'référence' : '')
        if (userDoc._attachments[r + '.jpg']) {
          $('.json-apercu img', $me).attr('src', '/_users/org.couchdb.user:' + student + '/' + r + '.jpg')
        } else {
          $('.json-apercu img', $me).remove()
        }
        $me.slideDown()
      }
    }
  })
})
