const express = require('express')
const app = express()
const apiRouter = require('./api/api.js')
const yargs = require('yargs').argv
const path = require('path')

app.use(express.static(path.resolve(__dirname, '../client-dist')))
app.use('/api', apiRouter)

const server = app.listen(3030, () => {
  console.log('Server listening on: http://localhost:' + (yargs.port||3030) )
})

// Handle ^C
process.on('SIGINT', () => {
  process.exit(0)
});