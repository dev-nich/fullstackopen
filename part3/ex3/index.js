const express = require('express')
const app = express()
app.use(express.json())


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

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
    response.json(persons)
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body
    if(body.name === undefined || body.number === undefined){
        response.json({error:'name or number missing'})
    }else{
        const isExist = persons.find((p)=>{return p.name === body.name })
        if(isExist){
            response.json({error:'name must be unique'})
        }else{
            persons = persons.concat({...body, id:`${randomId(persons.length)}`})
            response.json(persons)
        }
    }
  })

  app.get('/info', (request, response) => {
    const count = persons.length
    const now = new Date
    response.send(`<h1>Phonebook has info for ${count} people </h1><div>${now.toString()}</div>`)
  })

  app.get('/api/persons/:id', (request, response) => {
    const param = request.params.id
    const person = persons.find((p)=>{return p.id === param})

    if(person){
        response.json(person)
    }else{
        response.status(400).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const param = request.params.id
    const person = persons.filter((p)=>{return p.id !== param})

    response.status(204).end()
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })