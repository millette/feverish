'use strict'
module.exports = function (doc, req) {
  if (!doc || doc._id !== 'accueil') { return [null, ''] }
  const body = req && req.body && req.body.trim()
  if (!body) { return [null, ''] }
  doc.content = body
  doc.creator = req.userCtx.name
  doc.updatedAt = new Date().toISOString()
  return [doc, 'ok']
}
