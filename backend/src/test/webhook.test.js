const request = require('supertest')
const app = require('../app')

describe('Webhook Module - Advanced Tests', () => {

  test('should echo payload on success', async () => {
    const payload = { event: 'test', value: 123 }

    const res = await request(app)
      .post('/webhook')
      .send(payload)

    expect(res.statusCode).toBe(200)
    expect(res.body.data).toEqual(payload)
  })

  test('should return 400 for invalid scenario', async () => {
    const res = await request(app)
      .post('/webhook?scenario=invalid')

    expect(res.statusCode).toBe(400)
    expect(res.body.error).toBe('Invalid payload')
  })

  test('should delay response when scenario=timeout', async () => {
    const start = Date.now()

    const res = await request(app)
      .post('/webhook?scenario=timeout')

    const duration = Date.now() - start

    expect(res.statusCode).toBe(200)
    expect(duration).toBeGreaterThanOrEqual(3000)
  })

})
