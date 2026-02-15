const express = require('express')
const cors = require('cors')

const authRoutes = require('./modules/auth/auth.routes')
const webhookRoutes = require('./modules/webhook/webhook.routes')
const simulatorRoutes = require('./modules/simulator/simulator.routes')

const app = express()

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/webhook', webhookRoutes)
app.use('/simulator', simulatorRoutes)

module.exports = app
