import {MongoClient} from 'mongodb';

import destroy from './destroy';
import get from './get';
import insert from './insert';
import update from './update';

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
    insertPhoto(photo) {
        return getDb.then(db => insert(db, photo));
    },
    getPhotos(filter = {}) {
        return getDb.then(db => get(db, filter));
    },
    deletePhoto(key) {
        return getDb.then(db => destroy(db, {key}));
    },
    updatePhoto(key, newValues) {
        return getDb
            .then(db => update(db, {key}, newValues))
            .then(() => this.getPhotos({key}))
            .then(photos => photos[0]);
    }
};
