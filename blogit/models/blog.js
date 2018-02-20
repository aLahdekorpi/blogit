const mongoose = require('mongoose')
const config = require('../utils/config')


const url = config.mongoUrl

mongoose.connect(url)

const Blog = mongoose.model('Blog', {
    title: String,
    id: Number,
    author: String,
    url: String,
    likes: Number
  })
  module.exports = Blog