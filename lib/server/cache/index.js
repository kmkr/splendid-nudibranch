"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.put = put;
exports.clear = clear;
var cache = {};

function get(key) {
  return cache[key];
}

function put(key, val) {
  cache[key] = val;
}

function clear() {
  cache = {};
}