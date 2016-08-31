'use strict'
module.exports = function (doc, req) {
  if (!doc || doc._id !== 'autocompleter') { return 'bad path' }
  if (req.userCtx.roles.indexOf('teacher') === -1 && req.userCtx.roles.indexOf('_admin') === -1) { return 'not a teacher' }
  const tpl = require('views/lib/templates')
  req.userCtx.theme = doc.theme
  req.userCtx.travail = doc.travail
  return tpl.autocompleter(req.userCtx)
}
