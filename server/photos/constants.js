const BASE = "https://s3.eu-central-1.amazonaws.com";
const BUCKET = "splendid-nudibranch";
module.exports.BUCKET = BUCKET;
module.exports.base = `${BASE}/${BUCKET}`;

module.exports.resizeTo = [
  {
    name: "thumb",
    shortName: "thumb",
    width: 220,
  },
  {
    name: "xsmall",
    shortName: "xs",
    width: 500,
  },
  {
    name: "small",
    shortName: "s",
    width: 1000,
  },
  {
    name: "medium",
    shortName: "m",
    width: 1400,
  },
  {
    name: "large",
    shortName: "l",
    width: 1900,
  },
  {
    name: "xlarge",
    shortName: "xl",
    width: 2560,
  },
  {
    name: "xxlarge",
    shortName: "xxl",
    skipPayload: true,
    width: 3200,
  },
];

module.exports.generalSiteDescription =
  "Photos of mostly animals, and the occasional tree.";
