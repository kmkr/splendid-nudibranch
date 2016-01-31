export default (db, _photo) => {
    const now = new Date();
    const photo = Object.assign({}, _photo, {
        created_at: now,
        updated_at: now
    });

    return new Promise((resolve, reject) => {
        return db.collection('photos').insert(photo, (err, result) => {
            if (err) {
                return reject(err);
            }

            console.log('[db/index] Inserted photo');
            return resolve(result);
        });
    });
};
