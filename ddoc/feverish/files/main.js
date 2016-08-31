/* globals $ */
$(function () {
  'use strict'
  $(document).foundation()
  const $button = $('.top-bar > .top-bar-right > .menu > li > button.button')
  $button.addClass('warning').click(function (ev) {
    $.ajax({
      url: '/_session',
      method: 'DELETE',
      complete: function () { window.location = '/_utils/groupe2016.html' }
    })
  })
})
