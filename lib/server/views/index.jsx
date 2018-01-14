'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _default = require('./layouts/default');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Index = function Index(_ref) {
    var photos = _ref.photos,
        keywords = _ref.keywords,
        selectedPhotoKey = _ref.selectedPhotoKey,
        year = _ref.year,
        location = _ref.location;
    return _react2.default.createElement(
        _default2.default,
        {
            photos: photos,
            keywords: keywords,
            year: year,
            location: location,
            selectedPhotoKey: selectedPhotoKey },
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'div',
                { id: 'app' },
                _react2.default.createElement(
                    'div',
                    { className: 'loading-placeholder' },
                    _react2.default.createElement('div', { className: 'spinner' })
                )
            ),
            _react2.default.createElement('script', { type: 'text/javascript', dangerouslySetInnerHTML: { __html: '\n                window.snPhotos = ' + JSON.stringify(photos) + '\n            ' } }),
            _react2.default.createElement('script', {
                type: 'text/javascript',
                src: '/static/scripts/bundle.js',
                async: true,
                charSet: 'utf-8' })
        )
    );
};

exports.default = Index;