import db from '../../db';
import {base} from '../constants';
import * as photoDataFormatter from '../photo-data-formatter';

export default () => (
    Promise.all([db.getTags(), db.getPhotos()])
        .then(([tags, photos]) => ({
            base,
            photos: photoDataFormatter.dbToClient(photos, tags)
        }))
);
