const bodyParser = require('body-parser')
const blogRouter = require('express').Router()
const mongoose = require('mongoose')
const Blog = require('../models/blog')




  blogRouter.get('/', async (request, response)  =>  {
   response.json(await Blog.find({}))
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

    const blog = new Blog({
      title: body.title,
      author: body.author,
      src: body.src,
      likes: body.likes
      })
    await blog.save()
    await response.status(201).json(blog)
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