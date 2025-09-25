const express = require('express')
const app = express()
app.use(express.json())

// logger middleware 
const morgan = require('morgan')

// display request body
morgan.token('body', function getBody (req) {
    return JSON.stringify(req.body)
})
const logger = morgan(':method :url :status :res[content-length] - :response-time ms :body')
app.use(logger)

app.use(express.static('dist'))

const Person = require('./models/person')

const max = 200;

const randomId = (min) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        response.json(result)
    })
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body
    const name = body.name
    const number = body.number
    if(name === undefined || number === undefined){
        response.json({error:'name or number missing'})
    }else{
        Person.find({name:{$eq:name}}).then((result)=>{
            if(result.length > 0){
                response.json({error:'name must be unique'})
            }else{
                const newPerson = new Person({
                    name: name,
                    number: number,
                })

                newPerson.save().then((result)=>{
                    response.json(result)
                })
            }
        })

    }
  })

  app.get('/info', (request, response) => {
    const count = persons.length
    const now = new Date
    response.send(`<h1>Phonebook has info for ${count} people </h1><div>${now.toString()}</div>`)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    console.log(id)
    Person.find({_id:{$eq:id}}).then(result => {
        console.log(result)
        if(result.length > 0){
            response.json(result)
        }else{
            response.status(400).end()
        }
    })
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.findOneAndDelete({_id:{$eq:id}}).then((result)=>{
        const formattedId = result._id.toString()
        response.json(result ? {id:formattedId} : null)
        response.status(204).end()
    })
  })
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  