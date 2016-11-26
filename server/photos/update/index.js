import db from '../../db';
import * as photoDataFormatter from '../photo-data-formatter';

export default (key, newValues) => {
    return db.update('photos', {key}, newValues)
        .then(updatedPhoto => photoDataFormatter.dbToClient(updatedPhoto));
};
