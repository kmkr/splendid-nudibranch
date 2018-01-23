const db = require('../../db')

module.exports = req => {
  const origin = req.ip
  const ua = req.get('User-Agent')
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  const id = body.id
  return db.updateWithInsertFallback(
    'statistics',
    { id },
    {
      origin,
      ua,
      ...body
    }
  )
}
