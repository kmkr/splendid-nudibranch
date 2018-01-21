module.exports = (db, collectionName, filter) => {
  return new Promise((resolve, reject) => {
    return db
      .collection(collectionName)
      .find(filter)
      .toArray((err, result) => {
        if (err) {
          return reject(err)
        }

        return resolve(result)
      })
  })
}
