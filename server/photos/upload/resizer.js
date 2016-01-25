import gm from 'gm';

export default (filePath, width) => {
    return new Promise((resolve, reject) => {
        console.log('[resizer.js] Resizing file %s to %s', filePath, width);
        gm(filePath)
            .resize(width)
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

};
