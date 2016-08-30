/* globals $ */
$(function () {
  'use strict'
  const $input = $('input#theme-label')
  // console.log('$input:', $input)
  if (!$input.length) { return }

  $.getJSON('/themes.json', function (data) {
    const themes = data.rows.map(function (theme) { return theme.key })
    // console.log('themes:', themes)

    $input.autocomplete({
      source: [themes]
    })
  })

/*
  const getUsers = function () {
    const fn = function (data) {
      const filt = function (doc) {
        return doc.roles.indexOf('student') !== -1 && (!doc.corrections || !doc.corrections[exid])
      }
      const docs = data.rows.map(function (row) { return row.doc })
      const withAtts = docs.filter(filt)
      const atts = withAtts.length
        ? withAtts.map(function (doc) { return '<li><a href="/corrections/' + exid + '/' + doc.name + '">' + doc.name + '</a></li>' })
        : ['<li>[PERSONNE]</li>']
      $('ul#json').html(atts.join(''))

      const filt2 = function (doc) {
        return doc.roles.indexOf('student') !== -1 && doc.corrections && doc.corrections[exid]
      }
      const withAtts2 = docs.filter(filt2)
      const atts2 = withAtts2.length
        ? withAtts2.map(function (doc) { return '<li><a href="/corrections/' + exid + '/' + doc.name + '">' + doc.name + '</a></li>' })
        : ['<li>[PERSONNE]</li>']
      $('ul#json2').html(atts2.join(''))
    }
    const query = {
      startkey: '"org.couchdb.user:"',
      endkey: '"org.couchdb.user:\ufff0"',
      include_docs: true
    }
    $.getJSON('/_users/_all_docs', query, fn)
  }
  getUsers()
*/
})
