import gm from 'gm';

export function resize(filePath, size) {
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
                    return resolve({
                        buffer: buf
                    });
                });
            });
    });

}

export function metadata(filePath) {
    return new Promise((resolve, reject) => {
        gm(filePath).identify((err, value) => {
            if (err) {
                return reject(err);
            }

            console.log(value);
            return resolve(value.size);
        });
    });
}
