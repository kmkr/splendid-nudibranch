import db from '../../db';
import {base} from '../constants';
import photoToClientFormatter from '../photo-to-client-formatter';

export default () => {
    return new Promise((resolve, reject) => {
        return db.getPhotos()
            .then(photos => {
                console.log(photoToClientFormatter);
                console.log(photoToClientFormatter(photos));
                return resolve({
                    base,
                    photos: photoToClientFormatter(photos)
                });
            })
            .catch(err => reject(err));
    });
};
