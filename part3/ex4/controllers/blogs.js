const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id.trim()

  const result = await Blog.findById(id)
  if(result){
    response.json(result)
  }else{
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const result = await blog.save()
      response
      .status(201)
      .json(result)
      .end()
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body
  const result = await Blog.findOneAndUpdate({_id:{$eq:id}},body, {new:true})
  response
    .status(200)
    .json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const result = await Blog.findOneAndDelete({_id:{$eq:id}})
  const formattedId = result._id.toString()
  response
    .status(204)
    .json(result ? {id:formattedId} : null)
    .end()
})
  

module.exports = blogsRouter