const package = require('../../../../package.json')
const v1Router = require('express').Router()

v1Router.use('/diagnostic', (req, res) => {
  res.status(200).send({
    version: package.version
  })
})

module.exports = v1Router;