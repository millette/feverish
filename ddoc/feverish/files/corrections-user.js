/* globals $, MediumEditor, app */
$(function () {
  'use strict'
  const score = function ($form, ponderation) {
    const ret = { ponderation: ponderation }
    $form.serializeArray().forEach(function (x) { ret[x.name] = x.value })
    ret.note = parseFloat(ret.note)
    ret.ponderation = parseFloat(ret.ponderation)
    ret.createdAt = new Date().toISOString()
    return ret
  }

  const bodyData = $('body').data()
  var userDoc
  var nextUser

  const saveUser = function (ud, errFn, succFn) {
    $.ajax({
      url: '/_users/' + ud._id,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(ud),
      error: errFn,
      success: succFn
    })
  }

  const userQuery = {
    startkey: '"org.couchdb.user:"',
    endkey: '"org.couchdb.user:\ufff0"',
    include_docs: true
  }

  const getNext = function (data) {
    nextUser = data.rows.sort(app.userSorter).filter(function (row) {
      return row.doc.roles.indexOf('student') !== -1 &&
        row.doc.name !== bodyData.student &&
        (!row.doc.corrections || !row.doc.corrections[bodyData.exercice])
    })
    .map(function (row) { return row.doc })[0]
  }

  $.getJSON('/_users/_all_docs', userQuery, getNext)
  $.getJSON('/_users/org.couchdb.user:' + bodyData.student, function (ud) {
    const $ed = $('#commentaires-label')
    var x
    userDoc = ud
    $('#reference-label').val(userDoc.opaque)
    const exData = userDoc.corrections && userDoc.corrections[bodyData.exercice]
    if (exData) {
      $('#note-label').val(exData.note)
      $ed.text(exData.commentaires)
      if (exData.reference) { $('#reference-label').prop('checked', true) }
    }
    x = new MediumEditor($ed[0], {
      autoLink: true,
      placeholder: { text: 'Tapez votre texte ici.' },
      toolbar: { buttons: ['h3', 'bold', 'italic', 'orderedlist', 'unorderedlist', 'quote'] }
    })
    $(x.origElements).hide()
  })

  $('form#score-student').submit(function (ev) {
    ev.preventDefault()
    const $form = $(this)
    const theScore = score($form, bodyData.ponderation)
    const refRole = [
      'ref',
      bodyData.exercice,
      userDoc.opaque + '.jpg'
    ].join(':')
    if (!userDoc.corrections) { userDoc.corrections = { } }
    userDoc.corrections[bodyData.exercice] = theScore
    if (userDoc.corrections[bodyData.exercice].reference) {
      userDoc.roles.push(refRole)
    } else {
      userDoc.roles = userDoc.roles.filter(function (x) { return x !== refRole })
    }
    const errorFn = function (a, b, c) { console.log('errorFn', a, b, c) }
    const successFn = function (a, b, c) {
      $('input[type="submit"]').addClass('success').val('Merci!')
      $form.prop('disabled', true)
      const nextUrl = ['/corrections', bodyData.exercice]
      if (nextUser) { nextUrl.push(nextUser.name) }
      window.location = nextUrl.join('/')
    }
    saveUser(userDoc, errorFn, successFn)
  })
})
