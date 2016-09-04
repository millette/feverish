/* globals $ */
$(function () {
  'use strict'
  const $login = $('#titre-label')
  const $firstname = $('#firstname-label')
  const $lastname = $('#lastname-label')
  const makeLogin = function (firstname, lastname) {
    const parts0 = firstname.split(' ')
    const parts1 = lastname.split(' ')
    return parts0[0] + ' ' + parts1[0]
  }
  $('.keyed').keyup(function (ev) { $login.val(makeLogin($firstname.val(), $lastname.val())) })
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
      .slice(0, 5)
      .filter(function (i) { return i })
    if (pwds.length !== 5 || pwds[4] !== pwds[3]) { return badAttempt() }
    if (makeLogin(pwds[0], pwds[1]) !== pwds[2]) { return badAttempt() }
    $.getJSON('/_uuids', function (uuids) {
      const uid = 'org.couchdb.user:' + pwds[2]
      const userDoc = {
        _id: uid,
        firstname: pwds[0],
        lastname: pwds[1],
        name: pwds[2],
        opaque: uuids.uuids[0],
        type: 'user',
        roles: ['student'],
        password: pwds[3]
      }
      $.ajax({
        url: '/_users/' + uid,
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
})
