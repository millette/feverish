/* globals $ */
$(function () {
  'use strict'
  const fn = function ($who, a, b, c, d) {
    const $sub = $('input[type="submit"]', $who)
    $sub.val('Merci!')
    $sub.removeClass('secondary')
    $sub.addClass('success')
  }
  $('#example-vert-tabs').on('change.zf.tabs', function (ev) {
    const $sub = $('.tabs-content input[type="submit"]')
    $sub.addClass('secondary')
    $sub.removeClass('success')
    $sub.val('Soumettre')
  })
  $('form.configure').submit(function (ev) {
    const $form = $(this)
    const data = $form.serialize()
    ev.preventDefault()
    $.ajax({
      method: 'POST',
      data: data,
      success: fn.bind(null, $form),
      error: function (a, b, c, d) { console.log('err post config', a, b, c, d) }
    })
  })
})
