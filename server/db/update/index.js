export default (db, collectionName, filter, newValues) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionName)
            .updateOne(filter, {$set: Object.assign(newValues, {updated_at: new Date()})}, (err, data) => {
                if (err) {
                    return reject(err);
                }

                return resolve(data);
            });
    });
};
