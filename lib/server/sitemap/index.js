'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _sitemap = require('sitemap');

var _sitemap2 = _interopRequireDefault(_sitemap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var sitemap = _sitemap2.default.createSitemap({
  hostname: 'http://thesplendidnudibranch.pink',
  cacheTime: 600000,
  urls: [{
    url: '//',
    changefreq: 'daily',
    priority: 0.3
  }]
});

router.get('/', function (req, res) {
  sitemap.toXML(function (err, xml) {
    if (err) {
      return res.status(500).end();
    }

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  });
});

exports.default = router;