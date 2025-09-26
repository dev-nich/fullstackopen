const express = require('express')
const app = express()
app.use(express.json())

app.use(express.static('dist'))

// logger middleware 
const morgan = require('morgan')

// display request body
morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})
const logger = morgan(':method :url :status :res[content-length] - :response-time ms :body')
app.use(logger)

const personsRouter = require('./controllers/persons')
app.use('/api/persons', personsRouter)
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response) => {
  if(error.name === 'CastError'){
    return response.status(400).json({ error: 'malformed id' })
  }else{
    return response.status(400).json({ error: error.message })
  }
}
  
app.use(errorHandler)
  