const blogRouter = require('express').Router()
const mongoose = require('mongoose')
const Blog = require('../models/blog')


  blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  blogRouter.post('/', (request, response) => {
    const body = request.body
    if (body.title === undefined) {
      response.status(400).json({ error: 'content missing' })
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      src: body.src,
      number: body.number
      })
    blog
    .save()
    .then(blog =>{
      response.status(201).json({heman})
    })
    /*.then(formattedBlog => {
      response.status(201).json(formattedBlog)
    })*/
})
/*const formatBlog = (blog) => {
    return {
      title: blog.title,
      author: blog.author,
      src: blog.src,
      number: blog.number
    }
  }*/


module.exports = blogRouter