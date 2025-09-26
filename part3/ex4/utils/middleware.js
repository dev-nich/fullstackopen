//const logger = require('./logger')
const morgan = require('morgan')

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})

const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

const errorHandler = (error, request, response, next) => {
  if(error.name === 'CastError'){
    return response.status(400).json({ error: 'malformed id' })
  }else{
    return response.status(400).json({ error: error.message })
  }

  // eslint-disable-next-line no-unreachable
  next(error)
}


module.exports = {
  morganLogger,
  errorHandler
}