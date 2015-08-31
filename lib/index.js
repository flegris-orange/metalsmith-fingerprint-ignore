/**
 * Dependencies
 */
var crypto = require('crypto')
var multimatch = require('multimatch')
var path = require('path')

/**
 * Constants
 */
var KEY = 'metalsmith'

/**
 * Export plugin
 */
module.exports = plugin

/**
 * Main export
 */
function plugin(options) {
  return function (files, metalsmith, done) {
    // Get metadata and set a fingerprint key
    var metadata = metalsmith.metadata()
    metadata.fingerprint =  (metadata.fingerprint || {})

    Object.keys(files)
      .filter(function (p) {
        // Filter by the pattern option
        return multimatch(p, options.pattern).length > 0
      })
      .forEach(function (p) {
        // Generate hash from file contents
        var hash = crypto.createHmac('md5', KEY).update(files[p].contents).digest('hex')
        // Get file extension
        var ext = path.extname(p)
        // Build fingerprinted filename
        var fingerprint =  [p.substring(0, p.lastIndexOf(ext)), '-', hash, ext].join('')
        // Add fingerprinted file to files
        files[fingerprint] = files[p]
        // Add fingerprinted filename to metadata
        metadata.fingerprint[p] = fingerprint
        // Remove original, unless specified otherwise
        if (!options.keep) delete files[p]
      })
    return process.nextTick(done)
  }
}
