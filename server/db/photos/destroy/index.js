export default (db, filter) => {
    return new Promise((resolve, reject) => {
        db.collection('photos')
            .deleteOne(filter, (err, data) => {
                if (err) {
                    return reject(err);
                }

                return resolve(data);
            });
    });
};
