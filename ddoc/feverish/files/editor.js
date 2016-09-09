/* globals $, MediumEditor */
$(function () {
  'use strict'
  var dirty = false
  var $saver
  var $saverImp = $('h1.title:first-child')
  $saverImp.html('<span>' + $saverImp.text() + '</span> <button class="button alert">SAUVEGARDER</button>')
  $saver = $('h1.title:first-child > button')

  const show = function (maybe) {
    if (maybe) {
      $('#main-editor *').removeClass('lead')
      $('#main-editor > p').first().addClass('lead')
      if (!dirty) { return }
    } else {
      dirty = true
    }
    $saver.show()
  }

  $(window).on('beforeunload', function () {
    if (dirty) { return 'Attention, vous n\'avez pas sauvegardé la page. Voulez-vous vraiment quitter cette page?' }
  })

  $('#main-editor > p:first-child').addClass('lead')
  const $ed = $('#main-editor')
  const x = new MediumEditor($ed[0], {
    autoLink: true,
    placeholder: { text: 'Tapez votre texte ici.' },
    toolbar: { buttons: ['h2', 'h3', 'h4', 'bold', 'italic', 'orderedlist', 'unorderedlist', 'quote'] }
  })

  x.subscribe('blur', show.bind(null, true))
  x.subscribe('editableInput', show.bind(null, false))
  $saver.hide()

  $saver.click(function (ev) {
    ev.preventDefault()
    const yeah = function (a, b, c, d) {
      if (a !== 'ok') { return console.log('saved error', a, b, c, d) }
      dirty = false
      $saver.hide()
    }

    $.ajax({
      method: 'POST',
      data: $('#main-editor').html(),
      success: yeah,
      error: function (a, b, c, d) { console.log('oups saving', a, b, c, d) }
    })
  })
})
