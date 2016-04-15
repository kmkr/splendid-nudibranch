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
    insert(collectionName, data) {
        return getDb.then(db => insertToCollection(db, collectionName, data));
    },
    list(collectionName, filter) {
        return getDb.then(db => getCollection(db, collectionName, filter));
    },
    delete(collectionName, filter) {
        return getDb.then(db => destroyFromCollection(db, collectionName, filter));
    },
    update(collectionName, filter, newValues) {
        return getDb
            .then(db => updateOneInCollection(db, collectionName, filter, newValues))
            .then(() => this.list(collectionName, filter))
            .then(data => data[0]);
    },
    updateWithInsertFallback(collectionName, filter, data) {
        return getDb.then(db => {
            return getCollection(db, collectionName, filter)
                .then(collection => {
                    if (collection.length) {
                        return updateOneInCollection(db, collectionName, filter, data);
                    }

                    return insertToCollection(db, collectionName, data);
                });
        });
    }
};
