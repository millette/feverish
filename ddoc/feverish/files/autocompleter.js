/* globals $ */
$(function () {
  'use strict'
  const $input = $('input[type="file"]')
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
