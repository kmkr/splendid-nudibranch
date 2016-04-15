import db from '../../db';
import * as photoDataFormatter from '../photo-data-formatter';

export default (key, newValues) => {
    return Promise.all([db.update('photos', {key}, newValues), db.list('tags')])
        .then(([updatedPhoto, tagsFromDb]) => photoDataFormatter.dbToClient(updatedPhoto, tagsFromDb));
};
