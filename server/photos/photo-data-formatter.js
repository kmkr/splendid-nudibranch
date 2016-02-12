function tagsForKey(key, tagsFromDb) {
    return tagsFromDb
        .filter(t => t.photos.some(photoKey => photoKey === key))
        .map(t => t.name);
}

function mapOne(photoFromDb, tagsFromDb) {
    const {base, description, key, name} = photoFromDb;
    return {
        base,
        description,
        key,
        name,
        tags: tagsForKey(key, tagsFromDb)
    };
}
export function dbToClient(photoArg, tagsArg) {
    if (photoArg.constructor === Array) {
        return photoArg.map(photo => mapOne(photo, tagsArg));
    }

    return mapOne(photoArg, tagsArg);
}
