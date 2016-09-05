/* globals log */
'use strict'
module.exports = function (newDoc, oldDoc, userCtx, secObj, mocks) {
  if (!mocks) { mocks = { log: log } }
  const sentinel = function (x) { return x.indexOf('}{') !== -1 }
  const internals = ['_id', '_rev', '_revisions', '_attachments']
  const internal = function (x) { return internals.indexOf(x) === -1 }
  const kn = Object.keys(newDoc).filter(internal).sort()
  const ouch = (err) => { throw err }

  const validateStudent = function () {
    const currentAtt = []
    var r
    if (userCtx.roles.indexOf('student') === -1) { return false }
    const ko = Object.keys(oldDoc).filter(internal).sort()
    // docs must have the same fields
    if (!ko.length || ko.length !== kn.length || ko.join('}{') !== kn.join('}{')) { ouch({ forbidden: 'student, can\'t touch this' }) }

    // we're expecting a single jpeg
    if (!newDoc._attachments) { ouch({ forbidden: 'expecting a jpeg from student' }) }
    for (r in newDoc._attachments) { if (newDoc._attachments[r].revpos === 0) { currentAtt.push(r) } }
    if (currentAtt.length !== 1 || currentAtt[0].slice(-4) !== '.jpg') { ouch({ forbidden: 'expecting a (single) jpeg from student' }) }

    // At this point, we have what seems like a valid attachment upload
    // Check for role (containing exercice id and user opaque id)
    if (userCtx.roles.indexOf(['ref', newDoc._id, currentAtt[0]].join(':')) === -1) { ouch({ forbidden: 'not expecting a jpeg from this student' }) }
    return true
  }

  if (kn.filter(sentinel).length) { ouch({ forbidden: 'illegal characters in field name' }) }
  if (validateStudent()) { return }
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
