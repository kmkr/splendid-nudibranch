import db from '../../db';

export default () => {
    return new Promise((resolve, reject) => {
        return db.getTags()
            .then(tags => resolve(tags))
            .catch(err => reject(err));
    });
};
