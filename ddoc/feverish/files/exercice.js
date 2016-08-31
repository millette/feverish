/* globals $ */
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
})
