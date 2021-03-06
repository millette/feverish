'use strict'
module.exports = function (doc, req) {
  if (doc) { return 'bad path' }
  if (!req.query.self && req.userCtx.roles.indexOf('teacher') === -1 && req.userCtx.roles.indexOf('_admin') === -1) { return 'not a teacher' }
  const tpl = require('views/lib/templates')
  if (req.query.self) {
    req.userCtx.self = true
    req.userCtx.student = req.userCtx.name
    return tpl.etudiant(req.userCtx)
  }
  if (req.query.user) {
    req.userCtx.student = req.query.user
    return tpl.etudiant(req.userCtx)
  }

  req.userCtx.fixer = req.query.fixer
  return tpl.etudiants(req.userCtx)
}
