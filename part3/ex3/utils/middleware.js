//const logger = require('./logger')
const morgan = require('morgan')

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})

const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

module.exports = {
  morganLogger
}