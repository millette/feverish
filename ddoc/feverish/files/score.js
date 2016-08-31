/* globals $ */
$(function () {
  'use strict'
  const $body = $('body')
  const bodyData = $body.data()
  const $score = $('#json-score')
  const $accordion = $('#json-score + #reference-image').hide()
  var lastRev

  const submitJpeg = function (bodyData, self, ev) {
    // see http://stackoverflow.com/a/11910333/1154755
    const $self = $(self)
    const exid = bodyData.exercice
    const docUrl = $self.parents('form').attr('action')
    const file = $self[0].files[0]
    const file2 = $self[0].files[0]
    const putRequest = new window.XMLHttpRequest()
    const fileReader = new window.FileReader()
    const fileReader2 = new window.FileReader()
    putRequest.open('PUT', docUrl + '/' + exid + '.jpg' + '?rev=' + lastRev, true)
    putRequest.setRequestHeader('Content-Type', file.type)
    fileReader2.readAsDataURL(file2)
    fileReader.readAsArrayBuffer(file)
    fileReader2.onload = function (readerEvent) { $('#reference-image img')[0].src = fileReader2.result }
    fileReader.onload = function (readerEvent) { putRequest.send(readerEvent.target.result) }
    putRequest.onreadystatechange = function (response) {
      if (putRequest.readyState === 4 && putRequest.status === 201) {
        const etag = putRequest.getResponseHeader('etag')
        lastRev = etag.slice(1, -1)
        $('label[for="fichier-label"]').addClass('success') // .text('Merci!')
        $('#reference-image img').attr('title', 'Merci!')
      } else {
        $('label[for="fichier-label"]').addClass('warning') // .text('Erreur #1...')
        $('#reference-image img').attr('title', 'Erreur #1...')
      }
    }
  }

  const makeHtml = function (score) {
    return '<p><span class="stat">' + score.percent + '%' + '</span> ' +
      score.note + '/' + score.ponderation + '</p>' +
      '<p>' + (score.reference ? '<span class="label alert"><span class="stat"> RÉFÉRENCE </span> </span> ' : '') +
      '<i>' + score.createdAt.split('T')[0] + '</i> ' + score.commentaires + '</p>'
  }

  const showScore = function (bodyData, userDoc, $score, score) {
    $accordion.show()
    lastRev = userDoc._rev
    score.percent = Math.round(1000 * score.note / score.ponderation) / 10
    $score.addClass('success').html(makeHtml(score))
    if (userDoc._attachments && userDoc._attachments[bodyData.exercice + '.jpg']) {
      $('#reference-image img').attr('src', ['/_users', userDoc._id, bodyData.exercice + '.jpg'].join('/'))
    }
    $body.on('change', 'input#fichier-label', submitJpeg.bind(null, bodyData, 'input#fichier-label'))
  }

  $.getJSON('/_users/org.couchdb.user:' + bodyData.student, function (userDoc) {
    const score = userDoc.corrections && userDoc.corrections[bodyData.exercice]
    if (score) {
      showScore(bodyData, userDoc, $score, score)
    } else {
      $score.addClass('warning').text('Aucun résultat disponible.')
    }
  })
})
