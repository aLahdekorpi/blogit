const Blog = require('../models/blog')



/*const nonExistingId = async () => {
    const blog = new Blog()
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
  }*/

const listWithTwoBlogs = [

    {
        title: 'Go To Statemenmeme',
        author: 'Edsger W. testi',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0
      },
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. mies',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
  ]

  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs
  }


module.exports = {
    listWithTwoBlogs,  blogsInDb
  }