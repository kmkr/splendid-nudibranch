import {MongoClient} from 'mongodb';

import getCollection from './get';
import insertToCollection from './insert';

import destroyPhoto from './photos/destroy';
import updatePhoto from './photos/update';

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
        return getDb.then(db => insertToCollection(db, 'photos', photo));
    },
    getPhotos(filter = {}) {
        return getDb.then(db => getCollection(db, 'photos', filter));
    },
    deletePhoto(key) {
        return getDb.then(db => destroyPhoto(db, {key}));
    },
    updatePhoto(key, newValues) {
        return getDb
            .then(db => updatePhoto(db, {key}, newValues))
            .then(() => this.getPhotos({key}))
            .then(photos => photos[0]);
    },
    getTags(filter = {}) {
        return getDb.then(db => getCollection(db, 'tags', filter));
    },
    insertTag(tag) {
        return getDb.then(db => insertToCollection(db, 'tags', tag));
    }
};
