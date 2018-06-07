const ApiRouter = require('express').Router()
const v1Router = require('./v1/v1')

ApiRouter.use('/v1', v1Router)

module.exports = ApiRouter;