import db from '../../db';

export default () => {
    return new Promise((resolve, reject) => {
        return db.list('collages')
            .then(collages => resolve(collages))
            .catch(err => reject(err));
    });
};
