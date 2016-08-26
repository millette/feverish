'use strict'
module.exports = function (doc, req) {
  if (doc) { return [null, 'ouin...'] }
  // TODO setup validate_doc_update() instead
  if (req.userCtx.roles.indexOf('teacher') === -1) { return [null, 'not a teacher'] }
  req.form._id = req.uuid
  req.form.creator = req.userCtx.name
  req.form.createdAt = new Date().toISOString()
  return [req.form, JSON.stringify(req.form, null, ' ')]
}
