import db from '../../db';
import {base} from '../constants';

export default () => {
    return new Promise((resolve, reject) => {
        return db.getPhotos()
            .then(photos => resolve({
                base,
                photos
            }))
            .catch(err => reject(err));
    });
};
