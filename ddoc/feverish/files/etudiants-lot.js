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
  const blarg = function () {
    const self = this
    $.getJSON('/_uuids?count=50', function (uuids) {
      const docs = {
        docs: self.result.trim()
          .split('\n')
          .map(function (line, i) {
            line = line.trim()
            const ret = line.split('\t').map(function (words) { return words.split(' ') })
            if (ret.length !== 3) { return }
            const name = ret[2][0] + ' ' + ret[1][0]
            return {
              name: name,
              firstname: ret[2].join(' '),
              lastname: ret[1].join(' '),
              opaque: uuids.uuids[i],
              password: ret[0][0],
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
    })
  }
  $input.on('change', function () {
    const f = this.files[0]
    if (f.type !== 'text/plain') { return }
    const reader = new window.FileReader()
    reader.onload = blarg
    reader.readAsText(f)
  })
})
