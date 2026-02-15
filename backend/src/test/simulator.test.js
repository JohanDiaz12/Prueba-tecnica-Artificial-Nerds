const request = require('supertest')
const app = require('../app')

describe('Simulator Module - Advanced Tests', () => {

  test('should return dynamic status and body', async () => {
    const res = await request(app)
      .get('/simulator')
      .query({ status: 418, delay: 0 })

    expect(res.statusCode).toBe(418)

    expect(res.body).toMatchObject({
      status: 418,
      delay: 0,
      message: 'Simulated response'
    })
  })

  test('should respect delay parameter accurately', async () => {
    const start = Date.now()

    await request(app)
      .get('/simulator')
      .query({ status: 200, delay: 1000 })

    const duration = Date.now() - start

    expect(duration).toBeGreaterThanOrEqual(1000)
    expect(duration).toBeLessThan(1600)
  })

  test('should default to 200 when status is invalid', async () => {
    const res = await request(app)
      .get('/simulator')
      .query({ status: 'invalid', delay: 0 })

    expect(res.statusCode).toBe(200)
  })

})
