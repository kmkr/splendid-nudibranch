const WHITELIST = ["/stats"];
const ADMIN_KEY = process.env.SN_ADMIN_ACCESS_KEY;

function getKey(path) {
  const segments = path.split("/");
  const lastSegment = segments[segments.length - 1];

  if (lastSegment.match(/[\w\d]{4}-[\w\d]{4}/)) {
    return lastSegment;
  }
}

module.exports.auth = function (req, res, next) {
  if (req.method === "GET") {
    return next();
  }

  if (WHITELIST.indexOf(req.path) > -1) {
    return next();
  }

  const key = getKey(req.path);
  const response = key ? { key } : {};

  if (!req.header("x-auth")) {
    res.status(400).json(response);
  }

  if (req.header("x-auth") === ADMIN_KEY) {
    return next();
  }

  res.status(403).end(response);
};
