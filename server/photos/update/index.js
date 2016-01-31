import db from '../../db';
import photoToClientFormatter from '../photo-to-client-formatter';

export default (key, newValues) => {
    return db.updatePhoto(key, newValues)
        .then(updatedPhoto => photoToClientFormatter(updatedPhoto));
};
