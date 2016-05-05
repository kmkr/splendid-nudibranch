import {resizeTo} from './constants';

function buildUrl(base, key, name, size) {
    return `${base}/${key}/${size}_${name}`;
}

function getLayout(width, height) {
    if (width === height) {
        return 'square';
    }

    if (width > height) {
        return 'landscape';
    }

    return 'portrait';
}

export function serverToClient(photoFromServer, base) {
    return {
        key: photoFromServer.key,
        title: photoFromServer.title,
        description: photoFromServer.description,
        latin: photoFromServer.latin,
        location: photoFromServer.location,
        tags: photoFromServer.tags,
        width: photoFromServer.width,
        height: photoFromServer.height,
        layout: getLayout(photoFromServer.width, photoFromServer.height),
        sizes: resizeTo.reduce((prev, current) => ({
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
        }), {})
    };
}
