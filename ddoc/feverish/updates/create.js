'use strict'
module.exports = function (doc, req) {
  if (doc) { return [null, 'ouin...'] }
  req.form._id = req.uuid
  req.form.creator = req.userCtx.name
  req.form.createdAt = new Date().toISOString()
  return [req.form, JSON.stringify(req.form, null, ' ')]
}
