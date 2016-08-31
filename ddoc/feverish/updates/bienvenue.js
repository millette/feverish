'use strict'
module.exports = function (doc, req) {
  if (!doc || doc._id !== 'accueil') { return [null, ''] }
  const body = req && req.body && req.body.trim()
  if (!body) { return [null, ''] }
  const re = /<h1[^]*>([^]*)<\/h1>([^]*)/
  const parts = body.match(re)
  if (parts) {
    doc.title = parts[1]
    doc.content = parts[2]
  } else {
    doc.content = body
  }
  doc.creator = req.userCtx.name
  doc.updatedAt = new Date().toISOString()
  return [doc, 'ok']
}
