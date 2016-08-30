/* globals $ */
$(function () {
  'use strict'
  const $input = $('input#theme-label')
  if (!$input.length) { return }
  $.getJSON('/themes.json', function (data) {
    $input.autocomplete({ source: [data.rows.map(function (theme) { return theme.key })] })
  })
})
