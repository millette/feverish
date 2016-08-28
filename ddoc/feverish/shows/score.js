'use strict'
module.exports = function (doc, req) {
  if (!doc || !doc.theme || !doc.title || !doc.createdAt || !doc.creator) { return 'not an exercise' }
  if (req.userCtx.roles.indexOf('student') === -1) { return 'not a student' }

  const tpl = require('views/lib/templates')
  req.userCtx.doc = doc

  return tpl['score'](req.userCtx)
}
