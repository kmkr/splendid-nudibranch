'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../common/constants');

var name = 'The Splendid Nudibranch';

function buildUrl(_ref) {
  var selectedPhotoKey = _ref.selectedPhotoKey,
      year = _ref.year,
      location = _ref.location;

  var url = 'http://www.thesplendidnudibranch.pink';

  if (selectedPhotoKey) {
    url += '/photos/' + selectedPhotoKey;
  }

  if (location || year) {
    url += '/?';
    url += Object.entries({ location: location, year: year }).filter(function (e) {
      return e[1];
    }).map(function (entry) {
      return entry[0] + '=' + entry[1];
    }).join('&');
  }

  return url;
}

exports.default = function (photos, _ref2) {
  var selectedPhotoKey = _ref2.selectedPhotoKey,
      year = _ref2.year,
      location = _ref2.location;

  var selectedPhoto = photos.filter(function (p) {
    return p.key === selectedPhotoKey;
  })[0];

  var filterTitle = void 0;
  if (location || year) {
    filterTitle = [location, year].filter(function (e) {
      return e;
    }).map(function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }).join(' ');
  }

  if (selectedPhoto) {
    var selectedPhotoSize = selectedPhoto.sizes.medium;

    return {
      'og:type': 'article',
      'og:site_name': name,
      'og:title': [filterTitle || selectedPhoto.title, name].filter(function (e) {
        return e;
      }).join(' :: '),
      'og:url': buildUrl({ selectedPhotoKey: selectedPhotoKey, year: year, location: location }),
      'og:description': selectedPhoto.description,
      'og:image': selectedPhotoSize.url,
      'og:image:width': selectedPhotoSize.width,
      'og:image:height': selectedPhotoSize.height
    };
  }

  return {
    'og:type': 'article',
    'og:site_name': name,
    'og:title': [filterTitle, name].filter(function (e) {
      return e;
    }).join(' :: '),
    'og:url': buildUrl({ year: year, location: location }),
    'og:description': _constants.description,
    'og:image': 'http://www.thesplendidnudibranch.pink/static/images/logo.png',
    'og:image:width': 1300,
    'og:image:height': 616
  };
};