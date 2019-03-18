const db = require('../../db')

const bots = ['typhoeus', 'bot', 'bingpreview', 'slack']

function isBot(ua) {
  return bots.some(bot => ua.includes(bot))
}

function oneMonthAgo() {
  const d = new Date()
  d.setMonth(d.getMonth() - 1)
  d.setHours(0, 0, 0)
  return d
}

module.exports = (fromDate = new Date(), toDate = oneMonthAgo()) =>
  db
    .list('statistics', {
      created_at: { $gte: fromDate, $lte: toDate }
    })
    .then(stats =>
      stats.map(s => ({
        createdAt: s.created_at,
        numActions: s.numActions,
        path: s.path,
        isBot: isBot(s.ua)
      }))
    )
