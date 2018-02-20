const bodyParser = require('body-parser')
const supertest = require('supertest')
const { app, server } = require('../src/index')
const api = supertest(app)
const Blog = require('../models/blog')

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


beforeAll(async () => {
  await Blog.remove({})

  let blogObject = new Blog(listWithTwoBlogs[0])
  await blogObject.save()

  blogObject = new Blog(listWithTwoBlogs[1])
  await blogObject.save()
})



test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body.length).toBe(listWithTwoBlogs.length)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('can post a blog', async() => {
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
    expect(response.body.length).toBe(listWithTwoBlogs.length + 1)
    expect(titles).toContain('uusi')
  
  })

  test('posting new blog with no likes -> 0 likes', async() => {


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
      expect(response.body.length).toBe(listWithTwoBlogs.length + 2)
      expect(likes).toContain(0)  

  })

  test('posting new blog with no url -> 400 badrequ', async() => {


    const newBlog = new Blog( {
      title: 'titteli on urli ei',
      author: 'no infolol',
      likes: 0,
      __v: 0
    })
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  })
  test('posting new blog with no title -> 400 badrequ', async() => {


    const newBl = new Blog( {
      author: 'no infolol',
      url: 'url on title ei',
      likes: 0,
      __v: 0
    })
    await api
    .post('/api/blogs')
    .send(newBl)
    .expect(400)
  })



afterAll(() => {
  server.close()
})