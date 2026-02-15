const express = require('express')
const router = express.Router()

const fakeUser = {
  email: 'artificial@nerdstest.com',
  password: '123456'
}

router.post('/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required'
    })
  }

  if (email !== fakeUser.email) {
    return res.status(401).json({
      error: 'User not found'
    })
  }

  if (password !== fakeUser.password) {
    return res.status(401).json({
      error: 'Invalid credentials'
    })
  }

  return res.status(200).json({
    token: 'fake-jwt-token',
    user: {
      email
    }
  })
})

module.exports = router
