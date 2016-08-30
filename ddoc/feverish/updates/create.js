'use strict'
module.exports = function (doc, req) {
  var r
  req.form.creator = req.userCtx.name
  req.form.ponderation = parseFloat(req.form.ponderation)
  req.form.descriptif = req.form.descriptif.trim()
  req.form.theme = req.form.theme.trim()

  if (doc) {
    req.form.updatedAt = new Date().toISOString()
    for (r in req.form) { doc[r] = req.form[r] }
    return [doc, JSON.stringify(doc, null, ' ')]
  }
  req.form.createdAt = new Date().toISOString()
  req.form._id = req.uuid
  return [req.form, JSON.stringify(req.form, null, ' ')]
}
