/* globals log */
'use strict'
module.exports = function (doc, req) {
  log(doc)
  log(req)
  return [null, 'ouin...']
}
