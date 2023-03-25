require('dotenv').config()

const express = require('express')
const app = express()
const http = require('http')
const bodyparser = require('body-parser')
const cors = require('cors')
const {createTerminus} = require('@godaddy/terminus')
const database = require('./src/config/database')
const {registeredRoutes} = require('./routes')

const server = http.createServer(app)

registeredRoutes(app)

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))
app.disable('x-powered-by')

const onSignal = () => {
  console.info('server is starting cleanup')
  database.cleanup()
  return Promise.resolve()
}

const onShutdown = () => {
  console.info('cleanup finished, server is shutting down')
}

const onHealthCheck = () => Promise.resolve('UP')


const terminusConfiguration = Object.freeze({
  signal: 'SIGINT',
  healthChecks: {
    '/healthcheck': onHealthCheck
  },
  onSignal,
  onShutdown
})

createTerminus(server, terminusConfiguration)

server.listen(process.env.PORT, 'localhost', () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}/`)
})

