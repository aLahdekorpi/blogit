const listHelper = require('../utils/list_helper')


describe('total likes', () => {
    const listWithNoBlog = []

    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
    const listWithThreeBlogs = [
        {
          _id: '5a422aa71b53',
          title: 'Go To Stateme',
          author: 'test W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 15,
          __v: 0
        },
        {
            _id: '325',
            title: 'Go To Statemenmeme',
            author: 'Edsger W. testi',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v: 0
          },
          {
            _id: '5345',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. mies',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
          }
      ]

    
  
    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
    test('when list has three blogs, likes sum up', () => {
        const result = listHelper.totalLikes(listWithThreeBlogs)
        expect(result).toBe(30)
      })
      test('when list has no blogs, likes return 0', () => {
        const result = listHelper.totalLikes(listWithNoBlog)
        expect(result).toBe(0)
      })
  })