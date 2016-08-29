'use strict'
module.exports = function (doc, req) {
  if (doc) { return 'bad path' }
  const tpl = require('views/lib/templates')
  return tpl.bienvenue(req.userCtx)
}
