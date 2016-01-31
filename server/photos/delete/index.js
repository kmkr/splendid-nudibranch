import db from '../../db';
import {deletePhoto} from '../s3/s3-deleter';

export default (key) => {
    return deletePhoto(key)
        .then(() => db.deletePhoto(key))
        .then(() => ({key}));
};
