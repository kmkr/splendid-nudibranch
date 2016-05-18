const lineProcessors = {
    tags: line => line.split(/\s/),
    fallback: line => line
};

function getMatchingPhoto(name, allPhotos) {
    return allPhotos.find(photo => photo.name === name);
}

function shouldUpdate(currentPhoto, allPhotos) {
    if (!currentPhoto.key) {
        return false;
    }
    const matchingPhoto = getMatchingPhoto(currentPhoto.name, allPhotos);
    return Object.keys(currentPhoto).some(key => key !== 'tags' && currentPhoto[key] !== matchingPhoto[key]);
}

export function map(content, photos) {
    const results = [];
    let currentPhoto = {};
    const allowedExtensions = /\.(jpg|gif|png)$/;
    const lines = content.split('\n').filter(line => line && line[0] !== '/');

    while (lines.length) {
        const line = lines.shift().trim();

        if (line.toLowerCase().match(allowedExtensions) || lines.length === 0) {
            if (shouldUpdate(currentPhoto, photos)) {
                results.push(currentPhoto);
            }

            currentPhoto = {};
            const matchingPhoto = getMatchingPhoto(line, photos);

            if (!matchingPhoto) {
                console.log(`Expected to find photo with name ${line} in list of photos, but did not find it! Skipping photo.`);
                continue;
            }

            currentPhoto.name = line;
            currentPhoto.key = matchingPhoto.key;
            continue;
        }

        const split = line.split(/\t/);
        const lineKey = split[0].toLowerCase();

        if (lineKey) {
            const processor = lineProcessors[lineKey] || lineProcessors.fallback;
            let lineVal = '';
            if (split.length > 1) {
                lineVal = split[split.length - 1];
            }
            currentPhoto[lineKey] = processor(lineVal);
            continue;
        }

        throw new Error(`Expected empty line, file name or tab separated key. Found "${line}"`);
    }

    return results;
}
