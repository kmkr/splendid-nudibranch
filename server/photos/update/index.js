import db from '../../db';
import * as photoDataFormatter from '../photo-data-formatter';

export default (key, newValues) => {
    return Promise.all([db.updatePhoto(key, newValues), db.getTags()])
        .then(([updatedPhoto, tagsFromDb]) => photoDataFormatter.dbToClient(updatedPhoto, tagsFromDb));
};
