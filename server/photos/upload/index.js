import idGenerator from './id-generator';
import s3Uploader from './s3-uploader';
import resizer from './resizer';
import tempFileWriter from './temp-file-writer';

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
                    const name = `${id}/${size}/${file.originalname}`;
                    const mimetype = file.mimetype;
                    return s3Uploader.upload(buffer, name, mimetype);
                }

                return Promise.all([
                    upload('small', results[0].buffer),
                    upload('medium', results[1].buffer),
                    upload('large', results[2].buffer),
                    upload('original', file.buffer)
                ]);
            })
            .then(responses => {
                resolve(
                    {
                        small: responses[0].url,
                        medium: responses[1].url,
                        large: responses[2].url,
                        original: responses[3].url
                    }
                );
            })
            .catch(err => reject(err));
    });
};
