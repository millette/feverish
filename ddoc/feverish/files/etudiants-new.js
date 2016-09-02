/* globals $ */
$(function () {
  'use strict'
  $('form#new-student').submit(function (ev) {
    ev.preventDefault()
    const $form = $(this)
    const badAttempt = function () {
      $form.parent().addClass('shake shake-horizontal shake-constant')
      setTimeout(function () {
        $form.parent().removeClass('shake shake-horizontal shake-constant')
      }, 500)
    }
    const pwds = $form.serializeArray()
      .map(function (i) { return i.value })
      .slice(0, 3)
      .filter(function (i) { return i })
    if (pwds.length !== 3 || pwds[2] !== pwds[1]) { return badAttempt() }
    const parts = pwds[0].split(' ')
    if (parts.length !== 2) { return badAttempt() }
    const userDoc = {
      _id: 'org.couchdb.user:' + pwds[0],
      name: pwds[0],
      type: 'user',
      roles: ['student'],
      password: pwds[1]
    }
    $.ajax({
      url: '/_users/org.couchdb.user:' + pwds[0],
      dataType: 'json',
      data: JSON.stringify(userDoc),
      method: 'PUT',
      error: function () { badAttempt() },
      success: function (userDoc) {
        window.location = '/etudiants'
      }
    })
  })
})