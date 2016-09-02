/* globals $ */
$(function () {
  'use strict'

  const $input = $('input[type="file"]')

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

  const blarg = function () {
    const docs = {
      docs: this.result.trim()
        .split('\n')
        .map(function (line) {
          line = line.trim()
          const ret = line.split('\t').map(function (words) { return words.split(' ')[0] })
          if (ret.length !== 3) { return }
          const name = ret[2] + ' ' + ret[1]
          return {
            name: name,
            password: ret[0],
            type: 'user',
            roles: ['student'],
            _id: 'org.couchdb.user:' + name
          }
        })
        .filter(function (u) { return u })
    }
    if (docs.docs && docs.docs.length) {
      $.ajax({
        contentType: 'application/json',
        dataType: 'json',
        url: '/_users/_bulk_docs',
        method: 'POST',
        data: JSON.stringify(docs),
        success: fn.bind(null, $input.parents('form')),
        error: function (a, b, c, d) { console.log('err bulk users', a, b, c, d) }
      })
    }
  }

  $input.on('change', function () {
    const f = this.files[0]
    if (f.type !== 'text/plain') { return }
    const reader = new window.FileReader()
    reader.onload = blarg
    reader.readAsText(f)
  })
})
