import {resizeTo} from '../../../common/constants';

function buildUrl(base, key, name, size) {
    return `${base}/${key}/${size}_${name}`;
}

export default (photoFromServer, base) => (
    resizeTo.reduce((prev, current) => (
        Object.assign(prev, {
            [current.name]: buildUrl(
                base,
                photoFromServer.key,
                photoFromServer.name,
                current.shortName
            )
        })
    ), {
        key: photoFromServer.key,
        description: photoFromServer.description,
        tags: photoFromServer.tags
    })
);
