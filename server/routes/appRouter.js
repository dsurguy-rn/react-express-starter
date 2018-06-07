const AppRouter = require('express').Router()
const ApiRouter = require('./api/api')

AppRouter.use('/api', ApiRouter)

module.exports = AppRouter;