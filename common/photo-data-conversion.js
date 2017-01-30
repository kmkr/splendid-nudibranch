import {resizeTo} from './constants';

function buildUrl(base, key, name, size) {
    return `${base}/${key}/${size}_${encodeURIComponent(name)}`;
}

function getMode(resizeData) {
    const {width, height} = resizeData[Object.keys(resizeData)[0]];

    return width > height ? 'landscape' : 'portrait';
}

export function serverToClient(photoFromServer, base) {
    return {
        name: photoFromServer.name,
        key: photoFromServer.key,
        title: photoFromServer.title,
        description: photoFromServer.description,
        latin: photoFromServer.latin,
        location: photoFromServer.location,
        tags: photoFromServer.tags,
        mode: getMode(photoFromServer.resize),
        sizes: resizeTo.reduce((prev, current) => {
            if (!photoFromServer.resize[current.name]) {
                console.log(`Warning: missing size ${current.name} for ${photoFromServer.name}`);
                return prev;
            }

            return {
                ...prev,
                [current.name]: {
                    url: buildUrl(
                        base,
                        photoFromServer.key,
                        photoFromServer.name,
                        current.shortName
                    ),
                    width: photoFromServer.resize[current.name].width,
                    height: photoFromServer.resize[current.name].height
                }
            };
        }, {})
    };
}
