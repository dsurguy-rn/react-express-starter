const v1Router = require('express').Router()

v1Router.use('/ping', (req, res)=>{
  res.status(200).send('pong')
})

module.exports = v1Router;