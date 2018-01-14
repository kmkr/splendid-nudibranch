export default (db, collectionName, filter) => {
  return new Promise((resolve, reject) => {
    db.collection(collectionName)
            .deleteOne(filter, (err, data) => {
              if (err) {
                return reject(err)
              }

              return resolve(data)
            })
  })
}
