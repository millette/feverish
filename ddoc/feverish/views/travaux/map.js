/* globals emit */
'use strict'
module.exports = function (doc, mocks) {
  if (!doc.travail) { return }
  if (!mocks) { mocks = { emit: emit } }
  if (doc.travail.substring && doc.title) {
    mocks.emit(doc.travail)
  } else if (doc.travail.forEach) {
    doc.travail.forEach((t) => mocks.emit(t))
  }
}
