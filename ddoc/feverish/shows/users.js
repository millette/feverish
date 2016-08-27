'use strict'
module.exports = function (doc, req) {
  if (doc) { return 'bad path' }
  if (req.userCtx.roles.indexOf('teacher') === -1 && req.userCtx.roles.indexOf('_admin') === -1) { return 'not a teacher' }
  const tpl = require('views/lib/templates')
  return tpl.users(req.userCtx)
}
