const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('dist'))

const middleware = require('./utils/middleware')
app.use(middleware.morganLogger)

const personsRouter = require('./controllers/persons')
app.use('/api/persons', personsRouter)

app.use(middleware.errorHandler)

module.exports = app