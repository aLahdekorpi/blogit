const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const existingUser = await User.find({username: body.username})
    if (existingUser.length>0 || body.username.length < 3)  {
      return response.status(400).json({ error: 'username must be unique and over 3 chars' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const taysidef = true
    if (body.taysi === false){
        taysidef = false
    }

    const user = new User({
      username: body.username,
      name: body.name,
      taysi : taysidef,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})
usersRouter.get('/', async (request, response)  =>  {
    const users = await User
    .find({})
    .populate('blogs')

  response.json(users.map(User.format))
   })

module.exports = usersRouter