const bodyParser = require('body-parser')
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('../utils/config')



const blogRouter = require('../controllers/blogController')
app.use(bodyParser.json())
app.use('/api/blogs', blogRouter)
app.use(express.static('build'))
app.use(cors())

const main = async () => {
const con = await mongoose.connect(config.mongoUrl)
mongoose.Promise = global.Promise
}
main()

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}