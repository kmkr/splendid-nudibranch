import idGenerator from './id-generator';
import s3Uploader from './s3-uploader';
import resizer from './resizer';
import tempFileWriter from './temp-file-writer';
import db from '../../db';

export default file => {
    return new Promise((resolve, reject) => {
        const id = idGenerator();
        tempFileWriter(file)
            .then(result => {
                return Promise.all([
                    resizer(result.path, 300),
                    resizer(result.path, 800),
                    resizer(result.path, 1400)
                ]);
            })
            .then(results => {
                function upload(size, buffer) {
                    const name = `${id}/${size}_${file.originalname}`;
                    const mimetype = file.mimetype;
                    return s3Uploader.upload(buffer, name, mimetype);
                }

                return Promise.all([
                    upload('s', results[0].buffer),
                    upload('m', results[1].buffer),
                    upload('l', results[2].buffer),
                    upload('o', file.buffer)
                ]);
            })
            .then(() => {
                console.log('[upload/index] Uploaded %s', file.originalname);
                const photo = {
                    key: id,
                    name: file.originalname
                };

                return db.insertPhoto(photo).then(() => resolve(photo));
            })
            .catch(err => reject(err));
    });
};
