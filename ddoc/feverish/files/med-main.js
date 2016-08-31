/* globals $, MediumEditor, MeMarkdown, _ */
$(function () {
  'use strict'
  const $ed = $('.ed')
  const x = new MediumEditor($ed[0], {
    extensions: {
      markdown: new MeMarkdown(_.debounce(function (md) { $ed.val(md) }, 400))
    },
    autoLink: true,
    toolbar: { buttons: ['h2', 'h3', 'bold', 'italic', 'orderedlist', 'unorderedlist', 'quote'] }
  })

  $ed.hide()
  $('form').submit(function (ev) {
    ev.preventDefault()
    console.log($ed.val(), x)
  })
})
