'use strict'
module.exports = function (newDoc, oldDoc, userCtx, secObj) {
  const ouch = (err) => { throw err }
  if (userCtx.roles.indexOf('teacher') === -1) { ouch({ unauthorized: 'not a teacher' }) }
  if (userCtx.name !== newDoc.creator) { ouch({ forbidden: 'wrong creator' }) }
  if (!newDoc.createdAt) { ouch({ forbidden: 'missing field: createdAt' }) }
  if (oldDoc) {
    if (!newDoc.updatedAt) { ouch({ forbidden: 'missing field: updatedAt' }) }
    if (oldDoc.updatedAt >= newDoc.updatedAt) { ouch({ forbidden: 'field updatedAt went back in time' }) }
  }
}
