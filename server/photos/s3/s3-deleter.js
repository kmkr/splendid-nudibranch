import {s3, generateParams} from './s3-wrapper';

import {listItems} from './s3-lister';
import {resizeTo} from '../../../common/constants';

function expectNumberOfKeys() {
    const numOriginalUpload = 1;

    return resizeTo.length + numOriginalUpload;
}

export function deletePhoto(key) {
    return new Promise((resolve, reject) => {
        return listItems(key)
            .then(data => {
                if (data.length !== expectNumberOfKeys()) {
                    return reject(`Expected ${expectNumberOfKeys()} keys with prefix ${key}, but found ${data.length}. Aborting deletion`);
                }

                const keys = data.map(elem => ({
                    Key: elem.Key
                }));

                console.log('[s3-deleter] Deleting %s keys', keys.length);

                s3.deleteObjects(generateParams({
                    Delete: {
                        Objects: keys
                    }
                }), (err, data) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(data);
                });
            });
    });
}
