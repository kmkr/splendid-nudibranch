import db from '../../db';
import {base} from '../constants';
import photoToClientFormatter from '../photo-to-client-formatter';

export default () => {
    return new Promise((resolve, reject) => {
        return db.getPhotos()
            .then(photos => resolve({
                base,
                photos: photoToClientFormatter(photos)
            }))
            .catch(err => reject(err));
    });
};
