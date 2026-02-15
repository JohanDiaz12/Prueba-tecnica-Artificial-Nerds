const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  let status = parseInt(req.query.status)
  let delay = parseInt(req.query.delay)

  if (isNaN(status)) status = 200
  if (isNaN(delay)) delay = 0


  if (status < 100 || status > 599) {
    return res.status(400).json({ error: 'Invalid HTTP status code' })
  }

  if (delay < 0) {
    return res.status(400).json({ error: 'Delay cannot be negative' })
  }

  if (delay > 5000) {
    return res.status(400).json({ error: 'Delay too large' })
  }

  setTimeout(() => {
    res.status(status).json({
      status,
      delay,
      message: 'Simulated response'
    })
  }, delay)
})


module.exports = router
