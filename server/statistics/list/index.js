const db = require('../../db')

function oneMonthAgo() {
  var d = new Date()
  d.setMonth(d.getMonth() - 1)
  d.setHours(0, 0, 0)
  d.setMilliseconds(0)
  return d
}

module.exports = () =>
  db
    .list('statistics', {
      created_at: { $gte: oneMonthAgo() }
    })
    .then(stats =>
      stats.map(s => ({
        createdAt: s.created_at,
        numActions: s.numActions,
        path: s.path
      }))
    )
