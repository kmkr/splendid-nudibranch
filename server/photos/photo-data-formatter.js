function mapOne(photoFromDb) {
    const {base, description, key, name} = photoFromDb;
    return {
        base,
        description,
        key,
        name
    };
}
export function dbToClient(arg) {
    if (arg.constructor === Array) {
        return arg.map(mapOne);
    }

    return mapOne(arg);
}
