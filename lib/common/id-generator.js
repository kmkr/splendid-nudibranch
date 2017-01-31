"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.id = id;
exports.uid = uid;
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function id() {
    return s4() + "-" + s4();
}

function uid() {
    return "" + s4() + s4() + "-" + s4() + s4();
}