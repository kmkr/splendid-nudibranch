import {MongoClient} from 'mongodb';

import getCollection from './get';
import insertToCollection from './insert';
import destroyFromCollection from './destroy';
import updateOneInCollection from './update';

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
        return getDb.then(db => destroyFromCollection(db, 'photos', {key}));
    },
    updatePhoto(key, newValues) {
        return getDb
            .then(db => updateOneInCollection(db, 'photos', {key}, newValues))
            .then(() => this.getPhotos({key}))
            .then(photos => photos[0]);
    },
    getTags(filter = {}) {
        return getDb.then(db => getCollection(db, 'tags', filter));
    },
    getCollages(filter = {}) {
        return getDb.then(db => getCollection(db, 'collages', filter));
    },
    insertTag(tag) {
        return getDb.then(db => insertToCollection(db, 'tags', tag));
    },
    updateTag(tagName, newValues) {
        return getDb.then(db => updateOneInCollection(db, 'tags', {name: tagName}, newValues));
    },
    storeStatistic(statistic) {
        return getDb.then(db => {
            return getCollection(db, 'statistics', {id: statistic.id})
                .then(statistics => {
                    if (statistics.length) {
                        return updateOneInCollection(db, 'statistics', {id: statistic.id}, statistic);
                    }

                    return insertToCollection(db, 'statistics', statistic);
                });
        });
    }
};
