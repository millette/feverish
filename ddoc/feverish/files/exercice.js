/* globals $, MediumEditor */
$(function () {
  'use strict'

  const setupAutocomplete = function (type) {
    const $input = $('input#' + type + '-label')
    if (!$input.length) { return }
    $.getJSON('/' + type + '.json', function (data) {
      $input.autocomplete({ source: [data.map(function (obj) { return obj.key })] })
    })
  }

  setupAutocomplete('theme')
  setupAutocomplete('travail')

  const $ed = $('#descriptif-label')
  const x = new MediumEditor($ed[0], {
    autoLink: true,
    placeholder: { text: 'Tapez votre texte ici.' },
    toolbar: { buttons: ['h3', 'bold', 'italic', 'orderedlist', 'unorderedlist', 'quote'] }
  })

  $(x.origElements).hide()
})
