const bodyParser = require('body-parser')
const blogRouter = require('express').Router()
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')




  blogRouter.get('/', async (request, response)  =>  {
    const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 } )

  response.json(blogs.map(Blog.format))
  })

  blogRouter.post('/', async (request, response) => {
    const body = request.body
    if (body.title === undefined || body.url === undefined) {
      response.status(400).json({ error: 'content missinglol' })
    }
    if(body.likes === undefined){
      body.likes = 0
    }
    /*const idArray = await Blog.find({}).map(blogi => blogi.id)
    const uusId = Math.max(idArray) + 1*/

    const user = await User.findById(body.userId)
    if(user._id === undefined){
      response.status(400).json({error: 'no user found'})
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      src: body.src,
      likes: body.likes,
      user : user._id
      })

      
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
    await response.status(201).json(Blog.format(blog))
    })

    blogRouter.delete('/:id', async (request, response) => {
      try {
        await Blog.findByIdAndRemove(request.params.id)
    
        response.status(204).end()
      } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
      }
    })

    blogRouter.delete('/', async (request, response) =>{
      await Blog.remove({})
      console.log("all gone")
      response.status(200)
    })

    blogRouter.put('/:id', async (request, response) => {
      const body = request.body
      const uus = new Blog({
        title: body.title,
        author: body.author,
        src: body.src,
        likes: body.likes,
        _id : request.params.id
      })
      try{
      await Blog.findByIdAndUpdate(request.params.id, uus)
      response.json(uus)
      } catch(exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
      }
      
    })

    /*.then(formattedBlog => {
      response.status(201).json(formattedBlog)
    })*/
/*const formatBlog = (blog) => {
    return {
      title: blog.title,
      author: blog.author,
      src: blog.src,
      number: blog.number
    }
  }*/


module.exports = blogRouter