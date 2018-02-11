const db = require('../../db')

let queue = []

setInterval(() => {
  console.log(`Inserting ${queue.length} items`)
  queue.forEach(func => func())
  queue = []
}, 1000 * 60 * 5)

module.exports = (req, data, isAsync = false) => {
  const origin = req.ip
  const ua = req.get('User-Agent')
  const id = data.id

  const func = () =>
    db.updateWithInsertFallback(
      'statistics',
      { id },
      {
        origin,
        ua,
        ...data
      }
    )

  if (isAsync) {
    queue.push(func)
    return Promise.resolve()
  } else {
    return func()
  }
}
