/* globals $ */
$(function () {
  'use strict'
  const $passwordButton = $('.top-bar > .top-bar-right > .menu > li > button.hollow')
  if ($passwordButton.length) {
    $passwordButton.attr('data-open', 'changePassword')
    $('body').append([
      '<div class="reveal" id="changePassword" data-reveal>',
      '<form class="shake">',
      '<h2>Changer votre mot de passe</h2>',
      '<label>Nouveau mot de passe:',
      '<input required type="text" name="password">',
      '</label>',
      '<label>Répétez le mot de passe:',
      '<input required type="text" name="password2">',
      '</label>',
      '<input class="button alert" type="submit" value="Remplacez mon mot de passe">',
      ' <button type="button" class="button warning" data-close>Annuler</button>',
      '</form>',
      '<button class="close-button" data-close aria-label="Annuler" type="button">',
      '<span aria-hidden="true">&times;</span>',
      '</button>',
      '</div>'
    ].join(''))
  }
  $(document).foundation()

  $('body').on('submit', '#changePassword > form', function (ev) {
    ev.preventDefault()
    const $form = $(this)
    const adminname = $('button.adminname').data('adminname')
    const badAttempt = function () {
      $form.addClass('shake-horizontal shake-constant')
      setTimeout(function () {
        $form.removeClass('shake-horizontal shake-constant')
      }, 500)
    }
    const pwds = $form.serializeArray()
      .map(function (i) { return i.value })
      .slice(0, 2)
      .filter(function (i) { return i })
    if (pwds.length !== 2 || pwds[0] !== pwds[1]) { return badAttempt() }
    $.ajax({
      dataType: 'json',
      url: '/_users/org.couchdb.user:' + adminname,
      success: function (userDoc, b, c, d) {
        if (userDoc.roles.indexOf('teacher') === -1 && userDoc.roles.indexOf('_admin') === -1) { return badAttempt() }
        $.ajax({
          dataType: 'json',
          method: 'PUT',
          url: '/admin/' + adminname,
          data: JSON.stringify(pwds[0]),
          error: function (a, b, c, d) {
            badAttempt()
          },
          success: function (a, b, c, d) {
            $('#changePassword').foundation('close')
          }
        })
      }
    })
  })

  $('button.logout').click(function (ev) {
    $.ajax({
      url: '/_session',
      method: 'DELETE',
      complete: function () { window.location = '/_utils/groupe2016.html' }
    })
  })
})
