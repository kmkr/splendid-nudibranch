import db from '../../db';

export default () => {
    return new Promise((resolve, reject) => {
        return db.getCollages()
            .then(collages => resolve(collages))
            .catch(err => reject(err));
    });
};
