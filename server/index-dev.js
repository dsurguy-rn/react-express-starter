const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const compiler = webpack(require('../webpack.config.js'))
const express = require('express')
const app = express()
const apiRouter = require('./api/api.js')
const watch = require('node-watch')
const yargs = require('yargs').argv
const path = require('path')

webpackDev = webpackDevMiddleware(compiler)
webpackHot = webpackHotMiddleware(compiler)
app.use(webpackDev)
app.use(webpackHot)

watch(path.resolve(__dirname, '../client/'), { recursive: true, filter: file => !/node_modules|.js/.test(file) }, ()=>{
  webpackHot.publish({action: 'reload'})
})

app.use(express.static(path.resolve(__dirname, '../client-dist/')))
app.use('/api', apiRouter)

const server = app.listen(3030, () => {
  console.log('Server listening on: http://localhost:' + (yargs.port||3030) )
})

// Handle ^C
process.on('SIGINT', () => {
  process.exit(0)
});