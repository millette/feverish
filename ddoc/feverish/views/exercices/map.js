/* globals emit */
'use strict'
module.exports = function (doc, mocks) {
  if (doc._id === 'autocompleter' || !doc.theme || !doc.creator || !doc.createdAt) { return }
  if (!mocks) { mocks = { emit: emit } }
  mocks.emit(doc.createdAt)
}
