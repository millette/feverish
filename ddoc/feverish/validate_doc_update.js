'use strict'
module.exports = function (newDoc, oldDoc, userCtx, secObj) {
  const ouch = (err) => { throw err }
  const adminDelete = newDoc._deleted && userCtx.roles.indexOf('_admin') !== -1
  if (userCtx.roles.indexOf('teacher') === -1 && userCtx.roles.indexOf('_admin') === -1) { ouch({ unauthorized: 'not a teacher' }) }
  if (newDoc._id === 'autocompleter' && !newDoc._deleted) { return }
  if (!adminDelete && userCtx.name !== newDoc.creator && !newDoc.content) { ouch({ forbidden: 'wrong creator' }) }
  if (!adminDelete && !newDoc.createdAt) { ouch({ forbidden: 'missing field: createdAt' }) }
  if (!adminDelete && oldDoc) {
    if (!newDoc.updatedAt) { ouch({ forbidden: 'missing field: updatedAt' }) }
    if (oldDoc.updatedAt >= newDoc.updatedAt) { ouch({ forbidden: 'field updatedAt went back in time' }) }
  }
}
