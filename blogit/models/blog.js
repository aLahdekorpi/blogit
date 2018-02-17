const mongoose = require('mongoose')

const url = 'mongodb://webapi:sekred@ds237848.mlab.com:37848/blogit'

mongoose.connect(url)

const Blog = mongoose.model('Blog', {
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  module.exports = Blog