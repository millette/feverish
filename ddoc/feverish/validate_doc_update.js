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
    const ko = Object.keys(oldDoc).filter(internal).sort()
    if (userCtx.roles.indexOf('student') !== -1) {
      // docs must have the same fields
      if (!ko.length || ko.length !== kn.length || ko.join('}{') !== kn.join('}{')) { ouch({ forbidden: 'student, can\'t touch this' }) }

      // we're expecting a single jpeg
      if (!newDoc._attachments) { ouch({ forbidden: 'expecting a jpeg from student' }) }
      for (r in newDoc._attachments) { if (newDoc._attachments[r].revpos === 0) { currentAtt.push(r) } }
      if (currentAtt.length !== 1 || currentAtt[0].slice(-4) !== '.jpg') { ouch({ forbidden: 'expecting a (single) jpeg from student' }) }
      /*
       * At this point, we have what seems like a valid attachment upload
       * We must test one last thing:
       * Does the attachment name correspond to one of the accepted references?
       * Perhaps we can (ab)use the roles and stick an ID in there...
       *
       * The attribute name must correspond to one the the user's roles
       * but the att. name must NOT match the user's name (untraceable)
       * NOR the exercice _id (we'll accept many atts for same exercice)
       *
       * Two ways to achieve this:
       * 1. create each user with a unique opaque random id (field or even a role)
       * 2. at the moment the teacher scores a student.....
      */
      if (userCtx.roles.indexOf(currentAtt[0].slice(0, -4)) === -1) { ouch({ forbidden: 'not expecting a jpeg from this student' }) }

      ouch({ unauthorized: 'hey, a student' })
      return
    }
  }

  if (kn.filter(sentinel).length) { ouch({ forbidden: 'illegal characters in field name' }) }

  validateStudent()

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
