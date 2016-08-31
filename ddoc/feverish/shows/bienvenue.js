'use strict'
module.exports = function (doc, req) {
  if (!doc || doc._id !== 'accueil') { return 'bad path' }
  const tpl = require('views/lib/templates')
  req.userCtx.editor =
    req.userCtx.roles.indexOf('teacher') !== -1 ||
    req.userCtx.roles.indexOf('_admin') !== -1

  req.userCtx.content = doc.content
  req.userCtx.title = doc.title
  return tpl.bienvenue(req.userCtx)
}
