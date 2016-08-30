/* globals $ */
$(function () {
  'use strict'
  const score = function ($form, ponderation) {
    const ret = { ponderation: ponderation }
    $form.serializeArray().forEach(function (x) { ret[x.name] = x.value })
    ret.note = parseFloat(ret.note)
    ret.ponderation = parseFloat(ret.ponderation)
    ret.createdAt = new Date().toISOString()
    return ret
  }

  const bodyData = $('body').data()
  var userDoc
  const userUrl = '/_users/org.couchdb.user:' + bodyData.student
  $.getJSON(userUrl, function (ud) {
    userDoc = ud
    const exData = userDoc.corrections && userDoc.corrections[bodyData.exercice]
    if (exData) {
      $('#note-label').val(exData.note)
      $('#commentaires-label').text(exData.commentaires)
    }
  })

  $('form').submit(function (ev) {
    ev.preventDefault()
    const $form = $(this)
    const completeFn = function (a, b, c) {
      console.log('completeFn', a, b, c)
    }

    const errorFn = function (a, b, c) {
      console.log('errorFn', a, b, c)
    }

    const successFn = function (a, b, c) {
      console.log('successFn', a, b, c)
      $('input[type="submit"]').addClass('success').val('Merci!')
      $form.prop('disabled', true)
    }

    if (!userDoc.corrections) { userDoc.corrections = { } }
    userDoc.corrections[bodyData.exercice] = score($form, bodyData.ponderation)

    $.ajax({
      url: userUrl,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(userDoc),
      complete: completeFn,
      error: errorFn,
      success: successFn
    })
  })
})
