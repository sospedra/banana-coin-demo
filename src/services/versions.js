const express = require('express')

module.exports.createVersion = (callback) => {
  const version = express.Router()

  callback(version)

  version.use((req, res, next) => {
    res.redirect(301, req.url)
  })

  return version
}
