'use strict'
module.exports = function (doc, req) {
  if (req.userCtx.roles.indexOf('student') === -1) {
    return 'not a student'
  }
  const tpl = require('views/lib/templates')
  return tpl.psd(req.userCtx)
}
