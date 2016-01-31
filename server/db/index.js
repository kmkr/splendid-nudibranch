import {MongoClient} from 'mongodb';

const url = process.env.SN_DB_URL;
const getDb = new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
        if (err) {
            return reject(err);
        }

        return resolve(db);
    });
});

export default {
    insertPhoto(_photo) {
        const now = new Date();
        const photo = Object.assign({}, _photo, {
            created_at: now,
            updated_at: now
        });
        return new Promise((resolve, reject) => {
            return getDb.then(db => {
                return db.collection('photos')
                    .insert(photo, (err, result) => {
                        if (err) {
                            return reject(err);
                        }

                        console.log('[db/index] Inserted photo');
                        return resolve(result);
                    });
            });
        });
    },
    getPhotos(filter = {}) {
        return new Promise((resolve, reject) => {
            return getDb.then(db => {
                return db.collection('photos')
                    .find(filter).toArray((err, photos) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(photos);
                    });
            });
        });
    },
    deletePhoto(key) {
        return getDb.then(db => {
            return db.collection('photos')
                .deleteOne({key});
        });
    },
    updatePhoto(key, newValues) {
        return new Promise((resolve, reject) => {
            getDb.then(db => {
                db.collection('photos')
                    .updateOne({key}, {$set: newValues}, err => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(
                            this.getPhotos({key}).then(photos => photos[0])
                        );
                    });
            });
        });
    }
};
