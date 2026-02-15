const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
  const { scenario } = req.query

  if (scenario === 'timeout') {
    await new Promise(resolve => setTimeout(resolve, 3000))
    return res.status(200).json({ message: 'Delayed response' })
  }

  if (scenario === 'invalid') {
    return res.status(400).json({ error: 'Invalid payload' })
  }

  return res.status(200).json({
    message: 'Webhook received',
    data: req.body
  })
})

module.exports = router
