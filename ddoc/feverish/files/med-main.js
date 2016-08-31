/* globals $, MediumEditor */
$(function () {
  'use strict'
  const $ed = $('.ed')
  const x = new MediumEditor($ed[0], {
    autoLink: true,
    toolbar: { buttons: ['h2', 'h3', 'bold', 'italic', 'orderedlist', 'unorderedlist', 'quote'] }
  })

  $ed.hide()
  $('form').submit(function (ev) {
    ev.preventDefault()
    console.log($ed.val(), x)
  })
})
