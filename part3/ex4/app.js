const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('dist'))

const middleware = require('./utils/middleware')
app.use(middleware.morganLogger)

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)

module.exports = app