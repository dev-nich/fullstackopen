require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)

  .then(console.log('connected to MongoDB'))
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, 'Name too short']
  },
  number: { 
    type: String,
    minLength: 8,
    match: [
      /^(?=\d{2,3}(-\d{1,8})$)[\d-]{1,12}$/,
      'Number must be in the format 000-00000000'
    ]
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)