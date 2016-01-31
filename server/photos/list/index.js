import db from '../../db';
import {base} from '../constants';
import * as photoDataFormatter from '../photo-data-formatter';

export default () => {
    return new Promise((resolve, reject) => {
        return db.getPhotos()
            .then(photos => resolve({
                base,
                photos: photoDataFormatter.dbToClient(photos)
            }))
            .catch(err => reject(err));
    });
};
