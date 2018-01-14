'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _license = require('./license');

var _license2 = _interopRequireDefault(_license);

var _ogTags = require('./og-tags');

var _ogTags2 = _interopRequireDefault(_ogTags);

var _constants = require('../../../common/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Layout = function Layout(_ref) {
    var children = _ref.children,
        photos = _ref.photos,
        keywords = _ref.keywords,
        selectedPhotoKey = _ref.selectedPhotoKey,
        year = _ref.year,
        location = _ref.location;
    return _react2.default.createElement(
        'html',
        null,
        _react2.default.createElement(
            'head',
            null,
            _react2.default.createElement(
                'title',
                null,
                'The Splendid Nudibranch'
            ),
            _react2.default.createElement('meta', { charSet: 'utf-8' }),
            _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' }),
            keywords && _react2.default.createElement('meta', { name: 'keywords', content: keywords }),
            _react2.default.createElement('meta', { name: 'description', content: 'Author: Kris-Mikael Krister, Illustrator: Hilde. D. Johannessen, ' + _constants.description }),
            _react2.default.createElement('link', { rel: 'stylesheet', href: '/static/app.css' }),
            Object.entries((0, _ogTags2.default)(photos, { selectedPhotoKey: selectedPhotoKey, year: year, location: location })).map(function (entry) {
                return _react2.default.createElement('meta', {
                    key: entry[0],
                    property: entry[0],
                    content: entry[1] });
            }),
            _react2.default.createElement('link', {
                href: 'https://fonts.googleapis.com/css?family=Raleway:300,600',
                rel: 'stylesheet',
                type: 'text/css' }),
            _react2.default.createElement('link', {
                rel: 'icon',
                type: 'image/png',
                href: '/static/images/favicon-100.png',
                sizes: '100x100' }),
            _react2.default.createElement('link', {
                rel: 'icon',
                type: 'image/png',
                href: '/static/images/favicon-192.png',
                sizes: '192x192' }),
            _react2.default.createElement('link', {
                rel: 'icon',
                href: '/static/images/favicon.ico',
                sizes: '32x32' }),
            _react2.default.createElement(_style2.default, null)
        ),
        _react2.default.createElement(
            'body',
            null,
            _react2.default.createElement(_license2.default, null),
            children
        )
    );
};

exports.default = Layout;