const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const compression = require("compression");

const { baseTitle, photoTitle } = require("../src/title-service");

const { auth } = require("./auth");
const photoRouter = require("./photos");
const viewDataService = require("./view-data-service");
const { groupByFeature, getFeatureName } = require("./feature-group-service");
const { serverToClient } = require("./photos/photo-data-conversion");
const ogTags = require("./og-tags");
const { generalSiteDescription } = require("./photos/constants");
const hashStore = require("./hash-store");
const newStatsItem = require("./statistics/new");
const { uid } = require("./id-generator");

function verifyEnv() {
  const missing = [
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
    "SN_DB_URL",
    "SN_S3_BASE",
    "SN_S3_BUCKET_NAME",
    "SN_ADMIN_ACCESS_KEY",
  ].filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing required env key(s) ${missing.join(", ")}`);
  }
}

verifyEnv();

const app = express();
app.disable("x-powered-by");
app.use(compression());
app.use(logger("combined"));
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(auth);
const isProd = process.env.NODE_ENV === "production";

app.use(
  "/static",
  express.static(`${__dirname}/static`, {
    maxAge: isProd ? 60 * 60 * 24 * 365 : 0, // 1 year
  })
);

const indexCssFile = isProd ? "/static/css/app.min.css" : "/static/css/app.css";

function render(res, { id, photoKey, feature } = {}, jsFile, cssFile) {
  return Promise.all([
    viewDataService.getPhotoData(),
    viewDataService.getAllKeywords(),
  ]).then(([photoData, allKeywords]) => {
    const mappedPhotos = photoData.photos.map((p) =>
      serverToClient(p, photoData.base)
    );
    if (feature && !Array.isArray(feature)) {
      feature = [feature];
    }
    const photos = feature
      ? groupByFeature(mappedPhotos, feature)
      : mappedPhotos;
    const featureName = getFeatureName(feature);
    let template = "index";
    let description = generalSiteDescription;
    let selectedPhoto;
    let title = baseTitle();
    let keywords = allKeywords;
    if (photoKey) {
      selectedPhoto = photos.find((p) => p.key === photoKey);
      if (selectedPhoto) {
        description = selectedPhoto.description;
        keywords = viewDataService.getKeywordsForPhoto(selectedPhoto);
        template = "photo";
        title = photoTitle(selectedPhoto);
      }
    }
    return res.render(template, {
      id,
      description,
      favico100: hashStore.withHash("/static/images/favicon-100.png"),
      favico192: hashStore.withHash("/static/images/favicon-192.png"),
      favico: hashStore.withHash("/static/images/favicon.ico"),
      featureName,
      js: hashStore.withHash(jsFile),
      css: hashStore.withHash(cssFile),
      photos: photos,
      selectedPhoto,
      title,
      ogTags: ogTags(photos, {
        selectedPhoto,
        feature,
        featureName,
      }),
      keywords,
    });
  });
}

app.get("/", (req, res) => {
  const id = uid();
  newStatsItem(req, { id, path: req.path }, true);
  render(
    res,
    {
      feature: req.query.feature,
      id,
    },
    "/static/scripts/bundle.js",
    indexCssFile
  );
});

app.get("/photos/:key", (req, res) => {
  const id = uid();
  newStatsItem(req, { path: req.path }, true);
  render(
    res,
    {
      feature: req.query.feature,
      id,
      photoKey: req.params.key,
    },
    "/static/scripts/bundle.js",
    indexCssFile
  );
});

app.get("/admin", (req, res) => {
  render(
    res,
    {},
    "/static/scripts/admin-bundle.js",
    "/static/css/app-admin.css"
  );
});

app.get("/admin/stats", (req, res) => {
  render(
    res,
    {},
    "/static/scripts/admin-stats-bundle.js",
    "/static/css/app-admin.css"
  );
});

app.use("/photos", photoRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
