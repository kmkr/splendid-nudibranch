'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = '\n.spinner {\n    width: 70px;\n    height: 70px;\n    background-color: #333;\n    margin: 0 auto;\n\n    border-radius: 100%;\n    -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;\n    animation: sk-scaleout 1.0s infinite ease-in-out;\n}\n\n#app > .spinner {\n    margin-top: 100px;\n}\n\n@-webkit-keyframes sk-scaleout {\n    0% { -webkit-transform: scale(0) }\n    100% {\n        -webkit-transform: scale(1.0);\n        opacity: 0;\n    }\n}\n\n@keyframes sk-scaleout {\n    0% {\n        -webkit-transform: scale(0);\n        transform: scale(0);\n    } 100% {\n        -webkit-transform: scale(1.0);\n        transform: scale(1.0);\n        opacity: 0;\n    }\n}\n\n#app > .loading-placeholder {\n    position: absolute;\n    left: 0;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    background-color: #dea392;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n}'.replace(/\s{2,}/g, '').replace(/\n/g, '');

var Style = function Style() {
    return _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: styles } });
};

exports.default = Style;