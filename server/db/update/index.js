export default (db, filter, newValues) => {
    return new Promise((resolve, reject) => {
        db.collection('photos')
            .updateOne(filter, {$set: newValues}, (err, data) => {
                if (err) {
                    return reject(err);
                }

                return resolve(data);
            });
    });
};
