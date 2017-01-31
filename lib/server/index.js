'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

require('./polyfills');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _auth = require('./auth');

var _photos = require('./photos');

var _photos2 = _interopRequireDefault(_photos);

var _sitemap = require('./sitemap');

var _sitemap2 = _interopRequireDefault(_sitemap);

var _statistics = require('./statistics');

var _statistics2 = _interopRequireDefault(_statistics);

var _robots = require('./robots');

var _robots2 = _interopRequireDefault(_robots);

var _viewDataService = require('./views/services/view-data-service');

var viewDataService = _interopRequireWildcard(_viewDataService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function verifyEnv() {
    var missing = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'SN_DB_URL', 'SN_S3_BASE', 'SN_S3_BUCKET_NAME', 'SN_ADMIN_ACCESS_KEY'].filter(function (key) {
        return !process.env[key];
    });
    if (missing.length) {
        throw new Error('Missing required env key(s) ' + missing.join(', '));
    }
}

verifyEnv();

var app = (0, _express2.default)();
app.disable('x-powered-by');
app.use((0, _compression2.default)());
app.use((0, _morgan2.default)('combined'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine({
    transformViews: false
}));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.text());
app.use(_auth.auth);
app.use('/static', _express2.default.static(__dirname + '/static'));

function photoIndex(res, _ref) {
    var photoKey = _ref.photoKey,
        year = _ref.year,
        location = _ref.location;

    return Promise.all([viewDataService.getPhotoData(), viewDataService.getKeywords()]).then(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            photoData = _ref3[0],
            keywords = _ref3[1];

        return res.render('index', {
            data: {
                photoData: photoData
            },
            selectedPhotoKey: photoKey,
            year: year,
            location: location,
            keywords: keywords
        });
    });
}

app.get('/', function (req, res) {
    photoIndex(res, { year: req.query.year, location: req.query.location });
});

app.get('/photos/:key', function (req, res) {
    photoIndex(res, { photoKey: req.params.key, year: req.query.year, location: req.query.location });
});

app.get('/admin', function (req, res) {
    viewDataService.getPhotoData().then(function (photoData) {
        return res.render('index-admin', {
            data: {
                photoData: photoData
            }
        });
    });
});
app.use('/photos', _photos2.default);
app.use('/stats', _statistics2.default);
app.use('/sitemap.xml', _sitemap2.default);
app.use('/robots.txt', _robots2.default);

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Listening on port ' + port);
});