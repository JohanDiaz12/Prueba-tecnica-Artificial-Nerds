const request = require('supertest')
const app = require('../app')

describe('Auth Module - Advanced Tests', () => {

  describe('Successful Login', () => {

    test('should return token and user object for valid credentials', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'artificial@nerdstest.com',
          password: '123456'
        })

      expect(res.statusCode).toBe(200)

      expect(res.body).toMatchObject({
        token: expect.any(String),
        user: {
          email: 'artificial@nerdstest.com'
        }
      })

      expect(res.body.error).toBeUndefined()
    })

  })

  describe('Validation Errors', () => {

    test('should return 400 if email is missing', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          password: '123456'
        })

      expect(res.statusCode).toBe(400)
      expect(res.body).toEqual({
        error: 'Email and password are required'
      })
    })

    test('should return 400 if password is missing', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'artificial@nerdstest.com'
        })

      expect(res.statusCode).toBe(400)
    })

  })

  describe('Authentication Errors', () => {

    test('should return 401 if user does not exist', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'artificial@wrongtest.com',
          password: '123456'
        })

      expect(res.statusCode).toBe(401)
      expect(res.body).toEqual({
        error: 'User not found'
      })
    })

    test('should return 401 if password is incorrect', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'artificial@nerdstest.com',
          password: 'wrongpassword'
        })

      expect(res.statusCode).toBe(401)
      expect(res.body).toEqual({
        error: 'Invalid credentials'
      })
    })

  })

})
