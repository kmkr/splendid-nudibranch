"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dbToClient = dbToClient;
function mapOne(photoFromDb) {
    var title = photoFromDb.title,
        description = photoFromDb.description,
        latin = photoFromDb.latin,
        location = photoFromDb.location,
        key = photoFromDb.key,
        name = photoFromDb.name,
        resize = photoFromDb.resize,
        tags = photoFromDb.tags;

    return {
        title: title,
        description: description,
        latin: latin,
        location: location,
        key: key,
        name: name,
        resize: resize,
        tags: tags || []
    };
}
function dbToClient(photoArg) {
    if (photoArg.constructor === Array) {
        return photoArg.map(mapOne);
    }

    return mapOne(photoArg);
}