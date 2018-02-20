const bodyParser = require('body-parser')
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
    console.log(request.body)
    const body = request.body
    if (body.title === undefined || body.url === undefined) {
      response.status(400).json({ error: 'content missing' })
    }
    if(body.likes === undefined){
      body.likes = 0
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      src: body.src,
      likes: body.likes
      })
    blog
    .save()
    .then(blog =>{
      response.status(201).json({blog})
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