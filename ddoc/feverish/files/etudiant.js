/* globals $ */
$(function () {
  'use strict'
  const student = $('body').data('student')
  $.getJSON('/_users/org.couchdb.user:' + student, function (userDoc) {
    // if (userDoc.corrections) { $('pre#json').text(JSON.stringify(userDoc.corrections, null, ' ')) }
    $('pre#json').text(JSON.stringify(userDoc, null, ' '))
  })
})
