import React from 'react';

import snFetch from '../../fetch';

function getFiles(fileList) {
    for (const file of fileList) {
        const data = new FormData();
        data.append('file', file);

        snFetch.post('/photos', data);
    }
}

function filesAdded({target}) {
    getFiles(Array.from(target.files || []));
}

const PhotoUploader = () => (
    <input
        type="file"
        multiple
        onChange={filesAdded} />
);

export default PhotoUploader;
