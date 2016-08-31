'use strict'
module.exports = function (doc, req) {
  var r
  req.form.creator = req.userCtx.name
  req.form.ponderation = parseFloat(req.form.ponderation)
  req.form.descriptif = req.form.descriptif.trim()
  req.form.theme = req.form.theme.trim()
  req.form.travail = req.form.travail.trim()

  const dest = {
    code: 303,
    headers: { location: '/exercices' }
    // headers: { location: '/edit/' + doc ? doc._id : req.uuid }
  }
  if (doc) {
    req.form.updatedAt = new Date().toISOString()
    for (r in req.form) { doc[r] = req.form[r] }
    return [doc, dest]
  }
  req.form.createdAt = new Date().toISOString()
  req.form._id = req.uuid
  return [req.form, dest]
}
