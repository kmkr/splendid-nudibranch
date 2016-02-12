export default (db, filter, newValues) => {
    return new Promise((resolve, reject) => {
        db.collection('photos')
            .updateOne(filter, {$set: Object.assign(newValues, {updated_at: new Date()})}, (err, data) => {
                if (err) {
                    return reject(err);
                }

                return resolve(data);
            });
    });
};
