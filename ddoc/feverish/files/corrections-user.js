/* globals $ */
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
  var referenceUser
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
  const getRef = function (data) {
    nextUser = data.rows.filter(function (row) {
      return row.doc.roles.indexOf('student') !== -1 &&
        row.doc.name !== bodyData.student &&
        (!row.doc.corrections || !row.doc.corrections[bodyData.exercice])
    })
    .map(function (row) { return row.doc })[0]

    referenceUser = data.rows.filter(function (row) {
      return row.doc.roles.indexOf('student') !== -1 &&
        row.doc.corrections &&
        row.doc.corrections[bodyData.exercice] &&
        row.doc.corrections[bodyData.exercice].reference &&
        row.doc.name !== bodyData.student
    })
    .map(function (row) { return row.doc })[0]
  }

  $.getJSON('/_users/_all_docs', userQuery, getRef)

  $('#reference-label').change(function (ev) {
    const nopFn = function () { }
    if ($(this).prop('checked')) {
      if (referenceUser) {
        if (window.confirm('Remplacer ' + referenceUser.name + '?')) {
          delete referenceUser.corrections[bodyData.exercice].reference
          saveUser(referenceUser, nopFn, nopFn)
        } else {
          $(this).prop('checked', false)
        }
      }
    }
  })

  $.getJSON('/_users/org.couchdb.user:' + bodyData.student, function (ud) {
    userDoc = ud
    const exData = userDoc.corrections && userDoc.corrections[bodyData.exercice]
    if (exData) {
      $('#note-label').val(exData.note)
      $('#commentaires-label').text(exData.commentaires)
      if (exData.reference) { $('#reference-label').prop('checked', true) }
    }
  })

  $('form').submit(function (ev) {
    ev.preventDefault()
    const $form = $(this)
    if (!userDoc.corrections) { userDoc.corrections = { } }
    userDoc.corrections[bodyData.exercice] = score($form, bodyData.ponderation)
    // const completeFn = function (a, b, c) { console.log('completeFn', a, b, c) }
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
