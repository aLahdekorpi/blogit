const mongoose = require('mongoose')
const config = require('../utils/config')



const url = config.mongoUrl

mongoose.connect(url)


const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  password: String,
  taysi: Boolean,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.statics.format = (user) => {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    blogs: user.blogs
  }
}

const User = mongoose.model('User', userSchema)
module.exports = User