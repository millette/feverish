/* globals emit */
'use strict'
module.exports = function (doc, mocks) {
  if (!doc.theme) { return }
  if (!mocks) { mocks = { emit: emit } }
  if (doc.theme.substring && doc.title) {
    mocks.emit(doc.theme)
  } else if (doc.theme.forEach) {
    doc.theme.forEach((t) => mocks.emit(t))
  }
}
