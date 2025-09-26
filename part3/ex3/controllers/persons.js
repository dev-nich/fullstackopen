const personsRouter = require('express').Router()
const Person = require('../models/person')

// personsRouter.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>')
// })
    
personsRouter.get('/', (request, response, next) => {
  Person.find({}).then(result => {
    response.json(result)
  }).catch((error) => next(error))
})
  
personsRouter.get('/:id', (request, response, next) => {
  const id = request.params.id.trim()
  Person.findById(id).then(result => {
    if(result){
      response.json(result)
    }else{
      response.status(404).end()
    }
          
  }).catch((error) => next(error))
})
  
// personsRouter.get('/info', (request, response, next) => {
//   Person.find({}).then((result)=>{
//     const count = result.length
//     const now = new Date
//     response.send(`<h1>Phonebook has info for ${count} people </h1><div>${now.toString()}</div>`)
//   }).catch((error) => next(error))
// })
  
personsRouter.post('/', (request, response, next) => {
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
  
personsRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id
  Person.findOneAndDelete({_id:{$eq:id}}).then((result)=>{
    const formattedId = result._id.toString()
    response.json(result ? {id:formattedId} : null)
    response.status(204).end()
  }).catch((error) => next(error))
})
  
personsRouter.put('/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body
  Person.findOneAndUpdate({_id:{$eq:id}},body).then((result)=>{
    response.json(result)
    response.status(204).end()
  }).catch((error) => next(error))
})

module.exports = personsRouter