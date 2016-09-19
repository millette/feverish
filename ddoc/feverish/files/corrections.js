/* globals $, app */
$(function () {
  'use strict'
  const exid = $('body').data('exid')

  const showUsers = function (d, todo) {
    const $sel = $(todo ? 'ul#json' : 'ul#json2')
    const filt = todo
      ? function (doc) {
        return doc.roles.indexOf('student') !== -1 && (!doc.corrections || !doc.corrections[exid])
      }
      : function (doc) {
        return doc.roles.indexOf('student') !== -1 && doc.corrections && doc.corrections[exid]
      }

    const act = todo
      ? function () { return '' }
      : function (doc) {
        if (doc.corrections && doc.corrections[exid] && doc.corrections[exid].reference) { return ' class="active"' }
        return ''
      }
    const withAtts = d.filter(filt)
    const atts = withAtts.length
      ? withAtts.sort(app.userSorter).map(function (doc) {
        return '<li' + act(doc) + '><a href="/corrections/' + exid + '/' + doc.name + '">' + doc.name + '</a></li>'
      })
      : ['<li class="menu-text">[' + (todo ? 'TERMINÉ' : 'PERSONNE') + ']</li>']
    $sel.html(atts.join(''))
  }

  const fn = function (data) {
    const docs = data.rows.map(function (row) { return row.doc })
    showUsers(docs, true)
    showUsers(docs, false)
  }
  const query = {
    startkey: '"org.couchdb.user:"',
    endkey: '"org.couchdb.user:\ufff0"',
    include_docs: true
  }
  $.getJSON('/_users/_all_docs', query, fn)
})
