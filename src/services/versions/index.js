const { noop } = require('lodash')
const express = require('express')

module.exports.createVersion = (callback = noop) => {
  const version = express.Router()

  callback(version)

  version.use((req, res) => {
    res.redirect(301, req.url)
  })

  return version
}
