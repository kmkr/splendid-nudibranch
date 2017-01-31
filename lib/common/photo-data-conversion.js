'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.serverToClient = serverToClient;

var _constants = require('./constants');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function buildUrl(base, key, name, size) {
    return base + '/' + key + '/' + size + '_' + encodeURIComponent(name);
}

function getMode(resizeData) {
    var _resizeData$Object$ke = resizeData[Object.keys(resizeData)[0]],
        width = _resizeData$Object$ke.width,
        height = _resizeData$Object$ke.height;


    return width > height ? 'landscape' : 'portrait';
}

function serverToClient(photoFromServer, base) {
    return {
        name: photoFromServer.name,
        key: photoFromServer.key,
        title: photoFromServer.title,
        description: photoFromServer.description,
        latin: photoFromServer.latin,
        location: photoFromServer.location,
        tags: photoFromServer.tags,
        mode: getMode(photoFromServer.resize),
        sizes: _constants.resizeTo.reduce(function (prev, current) {
            if (!photoFromServer.resize[current.name]) {
                console.log('Warning: missing size ' + current.name + ' for ' + photoFromServer.name);
                return prev;
            }

            return _extends({}, prev, _defineProperty({}, current.name, {
                url: buildUrl(base, photoFromServer.key, photoFromServer.name, current.shortName),
                width: photoFromServer.resize[current.name].width,
                height: photoFromServer.resize[current.name].height
            }));
        }, {})
    };
}