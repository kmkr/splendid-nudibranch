import gm from 'gm';

export function resize(filePath, size, sizeLabel) {
    return new Promise((resolve, reject) => {
        console.log('[resizer.js] Resizing file %s to %s', filePath, size);
        gm(filePath)
            .resize(size, size)
            .autoOrient()
            .stream((err, stdout) => {
                if (err) {
                    return reject(err);
                }
                let buf = new Buffer('');
                stdout.on('data', data => {
                    buf = Buffer.concat([buf, data]);
                });
                stdout.on('end', () => {
                    gm(buf).identify((err, value) => {
                        return resolve({
                            sizeLabel,
                            ...value.size,
                            buffer: buf
                        });
                    });
                });
            });
    });

}

function parseDate(exifDate) {
    //2016:04:09 21:11:45 to 2016-04-09 21:11:45
    return new Date(exifDate.replace(':', '-'));
}

export function metadata(filePath) {
    return new Promise((resolve, reject) => {
        gm(filePath).identify((err, value) => {
            if (err) {
                return reject(err);
            }

            console.log(value);
            return resolve({
                ...value.size,
                shot_at: parseDate(value['Profile-EXIF']['Date Time Original'])
            });
        });
    });
}
