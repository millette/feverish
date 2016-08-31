'use strict'
module.exports = function (doc, req) {
  if (!doc || doc._id !== 'autocompleter') { return [null, ''] }
  if (req.userCtx.roles.indexOf('teacher') === -1 && req.userCtx.roles.indexOf('_admin') === -1) { return [null, ''] }
  const trimmed = function (x) { return x && x.trim() }
  const make = function (x) {
    return req.form[x]
      .split('\n')
      .filter(trimmed)
      .map(trimmed)
  }

  if (req.form.theme) { doc.theme = make('theme') }
  if (req.form.travail) { doc.travail = make('travail') }
  return [doc, 'ok']
}
