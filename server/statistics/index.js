const express = require('express')

const statEntryHandler = require('./new')
const listStatsHandler = require('./list')

const router = express.Router()

router.post('/', (req, res) => {
  statEntryHandler(req, JSON.stringify(req.body), true)
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({ err }))
})

router.get('/', (req, res) => {
  listStatsHandler()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).json({ err }))
})

module.exports = router
