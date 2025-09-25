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

const Person = require('./models/person')

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
  
app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(result => {
    response.json(result)
  }).catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id.trim()
  Person.findById(id).then(result => {
    if(result){
      response.json(result)
    }else{
      response.status(404).end()
    }
        
  }).catch((error) => next(error))
})

app.get('/info', (request, response, next) => {
  Person.find({}).then((result)=>{
    const count = result.length
    const now = new Date
    response.send(`<h1>Phonebook has info for ${count} people </h1><div>${now.toString()}</div>`)
  }).catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const name = body.name
  const number = body.number
  if(name === undefined || number === undefined){
    response.json({error:'name or number missing'})
  }else{
    Person.find({name:{$eq:name}}).then((result)=>{
      if(result.length > 0){
        response.json({error:'Name must be unique'})
      }else{
        const newPerson = new Person({
          name: name,
          number: number,
        })

        newPerson.save().then((result)=>{
          response.json(result)
        }).catch((error) => next(error))
      }
    }).catch((error) => next(error))
  }
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findOneAndDelete({_id:{$eq:id}}).then((result)=>{
    const formattedId = result._id.toString()
    response.json(result ? {id:formattedId} : null)
    response.status(204).end()
  }).catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body
  Person.findOneAndUpdate({_id:{$eq:id}},body).then((result)=>{
    response.json(result)
    response.status(204).end()
  }).catch((error) => next(error))
})
  
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
  