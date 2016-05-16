import {resizeTo} from './constants';

function buildUrl(base, key, name, size) {
    return `${base}/${key}/${size}_${name}`;
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
