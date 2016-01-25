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
        const photo = Object.assign({}, photo, {
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

                        console.log('[db/index] Inserted photo %o', photo);
                        return resolve(result);
                    });
            });
        });
    },
    getPhotos() {
        return new Promise((resolve, reject) => {
            return getDb.then(db => {
                return db.collection('photos')
                    .find({}).toArray((err, photos) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(photos.map(({key, name}) => ({
                            key,
                            name
                        })));
                    });
            });
        });

    }
};
