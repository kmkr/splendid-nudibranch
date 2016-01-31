export default (db, filter) => {
    return new Promise((resolve, reject) => {
        return db.collection('photos').find(filter).toArray((err, photos) => {
            if (err) {
                return reject(err);
            }

            return resolve(photos);
        });
    });
};
