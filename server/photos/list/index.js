import db from '../../db';

const base = `${process.env.SN_S3_BASE}/${process.env.SN_S3_BUCKET_NAME}`;

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
