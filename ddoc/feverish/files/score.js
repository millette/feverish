/* globals $ */
$(function () {
  'use strict'
/*
  const score = function ($form, ponderation) {
    const ret = { ponderation: ponderation }
    $form.serializeArray().forEach(function (x) { ret[x.name] = x.value })
    ret.note = parseFloat(ret.note)
    ret.ponderation = parseFloat(ret.ponderation)
    ret.createdAt = new Date().toISOString()
    return ret
  }
*/

  const $body = $('body')
  const bodyData = $body.data()
  const $score = $('#json-score')

  const submitJpeg = function (bodyData, self, rev, ev) {
    // see http://stackoverflow.com/a/11910333/1154755
    const $self = $(self)
    const exid = bodyData.exercice
    const docUrl = $self.parents('form').attr('action')
    const file = $self[0].files[0]
    const putRequest = new window.XMLHttpRequest()
    const fileReader = new window.FileReader()
    putRequest.open('PUT', docUrl + '/' + exid + '.jpg' + '?rev=' + rev, true)
    putRequest.setRequestHeader('Content-Type', file.type)
    fileReader.readAsArrayBuffer(file)
    fileReader.onload = function (readerEvent) { putRequest.send(readerEvent.target.result) }
    putRequest.onreadystatechange = function (response) {
      if (putRequest.readyState === 4 && putRequest.status === 201) {
        $('label[for="fichier-label"]').addClass('success').text('Merci!')
        $self.prop('disabled', true)
      } else {
        $('label[for="fichier-label"]').addClass('warning').text('Erreur #1...')
      }
    }
  }

  const showUpload = function (student, $score) {
    $score.after([
      '<form id="upload-jpeg" action="/_users/org.couchdb.user:' + student + '">',
      '  <fieldset class="fieldset callout primary">',
      '  <h1 class="title text-center">Téléverser jpeg</h1>',
      '  <div class="row">',
      '    <div class="small-offset-4 small-8 medium-6 medium-offset-6 column">',
      '      <label for="fichier-label" class="button expanded">Choisir le fichier</label>',
      '      <input type="file" id="fichier-label" class="show-for-sr" name="jpeg" required>',
      '    </div>',
      '  </div>',
      '  </fieldset>',
      '</form>'
    ].join())
  }

  const showJpeg = function (exercice, userDoc) {
    $score.after('<img src="/_users/' + userDoc._id + '/' + exercice + '.jpg' + '" alt="jpeg">')
  }

  const makeHtml = function (score2) {
    return ('<p><span class="stat">' + score2.percent + '%' + '</span> ' + score2.note + '/' + score2.ponderation + '</p>' +
     '<p><i>' + score2.createdAt.split('T')[0] + '</i> ' + score2.commentaires + '</p>')
  }

  const showScore = function (bodyData, userDoc, $score, score3) {
    score3.percent = Math.round(1000 * score3.note / score3.ponderation) / 10
    $score.addClass('success').html(makeHtml(score3))
    if (userDoc._attachments && userDoc._attachments[bodyData.exercice + '.jpg']) {
      showJpeg(bodyData.exercice, userDoc)
    } else {
      showUpload(bodyData.student, $score)
    }
    $body.on('change', 'input#fichier-label', submitJpeg.bind(null, bodyData, 'input#fichier-label', userDoc._rev))
  }

  $.getJSON('/_users/org.couchdb.user:' + bodyData.student, function (userDoc) {
    const score4 = userDoc.corrections && userDoc.corrections[bodyData.exercice]
    if (score4) {
      showScore(bodyData, userDoc, $score, score4)
    } else {
      $score.addClass('warning').text('Aucun résultat disponible.')
    }
  })
})
