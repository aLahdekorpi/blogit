const bodyParser = require('body-parser')
const supertest = require('supertest')
const { app, server } = require('../src/index')
const api = supertest(app)
const Blog = require('../models/blog')
const {listWithTwoBlogs, blogsInDb } = require('./test_helper')





beforeEach(async () => {
  await Blog.remove({})
  const blogsDB = await blogsInDb()
  let blogObject = new Blog(listWithTwoBlogs[0])
  await blogObject.save()
  blogObject = new Blog(listWithTwoBlogs[1])
  await blogObject.save()
})



test('all blogs are returned and as json when GET api/blogs', async () => {
  const blogsDB = await blogsInDb()
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.length).toBe(blogsDB.length)
})

test('can post a blog', async() => {
  const blogsDB = await blogsInDb()
  const newB = new Blog( {
      title: 'uusi',
      author: 'uusi testi',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    })
  
    await api
    .post('/api/blogs')
    .send(newB)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
    const response = await api
      .get('/api/blogs')
  
    const titles = response.body.map(r => r.title)  
    expect(response.body.length).toBe(blogsDB.length + 1)
    expect(titles).toContain('uusi')
  
  })

  test('posting new blog with no likes -> 0 likes', async() => {
    const blogsDB = await blogsInDb()

    const newBlog = new Blog( {
      title: 'nolikes',
      author: 'no likeslol',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      __v: 0
    })
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/blogs')

      const likes = response.body.map(r => r.likes)  
      expect(response.body.length).toBe(blogsDB.length + 1)
      expect(likes).toContain(0)  

  })

  test('posting new blog with no url and title -> 400 badrequ', async() => {

    const newBlog = new Blog( {
      author: 'no infolol',
      likes: 0,
      __v: 0
    })
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  })



afterAll(() => {
  server.close()
})