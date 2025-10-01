const assert = require('node:assert')
const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const initialBlog = require('./blog_api_mock_data')


const api = supertest(app) // no need  to define port here 
const route = '/api/blogs'

beforeEach(async () => {
     await Blog.deleteMany({})
     await Blog.insertMany(initialBlog)
})

test('id is a unique identifier', async () => {
    const response = await api.get(route)
    const blogInDB = await Blog.find({_id:{$eq:response.body[0].id}})
    assert.equal(response.body[0].id, blogInDB[0]._id)
})


describe('GET blogs', () => {
     test('all blogs are returned', async () => {
        const response = await api.get(route)
        const blogInDB = await Blog.find({})
        assert.strictEqual(response.body.length, blogInDB.length)
    })
})

describe('POST blogs', () => {
    test('a valid blog can be added ', async () => {
        const newBlog = {
            title: 'New Blog title',
            author: 'Rolando B',
            likes: 12
        }

        await api
            .post(route)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get(route)

        const title = response.body.map(r => r.title)

        const blogInDB = await Blog.find({})

        assert.strictEqual(response.body.length, blogInDB.length)

        assert(title.includes(newBlog.title))
    })

    test('a blog can be added with likes property missing', async () => {
        const blogMissingLikes = {
            title: 'New Blog without likes',
            author: 'Rolando B'
        }

        const response = await api
        .post(route)
        .send(blogMissingLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.likes, 0)
    })

    test('a blog cannot be added with url property missing', async () => {
        const blogMissingTitle = {
            likes: 99
        }

        const response = await api
        .post(route)
        .send(blogMissingTitle)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
})

describe('PUT blogs', () => {
    test('a valid blog can be updated', async () => {
        const titleUpdate = 'New Blog title [Updated]'
        const allBlogs = await api.get(route).expect(200).expect('Content-Type', /application\/json/)
        const updatedBlog = allBlogs.body[0]
        updatedBlog.title = titleUpdate

        const response = await api
            .put(`${route}/${updatedBlog.id}`)
            .send(updatedBlog)
            .expect(200)

        const blogInDB = await Blog.find({_id:{$eq:updatedBlog.id}})
        assert(blogInDB[0].title.includes(titleUpdate))
    })
})

describe('DELETE blogs', () => {
    test('a valid blog can be deleted ', async () => {
        const allBlogs = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
        const deleteBlog = allBlogs.body[0]

        await api
            .delete(`/api/blogs/${deleteBlog.id}`)
            .expect(204)

        const blogInDB = await Blog.find({})
        assert.strictEqual(blogInDB.length, allBlogs.body.length - 1)
    })
})

after(async () => {
    await mongoose.connection.close()
})