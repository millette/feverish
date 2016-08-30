'use strict'
module.exports = function (doc, req) {
  if (req.userCtx.roles.indexOf('teacher') === -1 && req.userCtx.roles.indexOf('_admin') === -1) { return 'not a teacher' }
  const tpl = require('views/lib/templates')
  if (doc.description && !doc.descriptif) { doc.descriptif = doc.description }
  req.userCtx.doc = doc
  return tpl['create-exercice'](req.userCtx)
}
