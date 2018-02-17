const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')


const blogRouter = require('../controllers/blogController')
app.use('/api/blogs', blogRouter)


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

const mongoUrl = 'mongodb://webapi:sekred@ds237848.mlab.com:37848/blogit'
mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise


const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})