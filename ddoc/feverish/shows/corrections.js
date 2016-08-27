'use strict'
module.exports = function (doc, req) {
  if (!doc || !doc.theme || !doc.title || !doc.createdAt || !doc.creator) { return 'not an exercise' }
  if (req.userCtx.roles.indexOf('teacher') === -1 && req.userCtx.roles.indexOf('_admin') === -1) { return 'not a teacher' }

  const tpl = require('views/lib/templates')
  req.userCtx.doc = doc
  return tpl.corrections(req.userCtx)
}
