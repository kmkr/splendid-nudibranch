module.exports = (db, collectionName, _item) => {
  const now = new Date();
  const item = {
    ..._item,
    created_at: now,
    updated_at: now,
  };

  return new Promise((resolve, reject) => {
    return db.collection(collectionName).insertOne(item, (err, result) => {
      if (err) {
        return reject(err);
      }

      console.log(`[db/index] Inserted item to collection ${collectionName}`);
      return resolve(result);
    });
  });
};
