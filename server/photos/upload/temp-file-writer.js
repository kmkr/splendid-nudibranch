import fs from 'fs';
import idGenerator from '../../../common/id-generator';

export default (file) => {
    const temp = '/tmp';
    const tempFile = `${temp}/${idGenerator()}_${file.originalname}`;
    return new Promise((resolve, reject) => {
        console.log('[temp-file-writer] Writing %s', tempFile);
        fs.writeFile(tempFile, file.buffer, (err) => {
            if (err) {
                return reject(err);
            }

            return resolve({
                path: tempFile
            });
        });
    });
};
