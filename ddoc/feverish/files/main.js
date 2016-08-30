/* globals $ */
$(function () {
  'use strict'
  $(document).foundation()
  $('.top-bar > .top-bar-right > .menu > li > button.button').click(function (ev) {
    $.ajax({
      url: '/_session',
      method: 'DELETE',
      complete: function () { window.location = '/_utils/groupe2016.html' }
    })
  })
})
