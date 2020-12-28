module.exports.base = `${process.env.SN_S3_BASE}/${process.env.SN_S3_BUCKET_NAME}`;

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
  "Photos of sea critters, slender sharks, beautiful shrimps, lots of fish and splendid nudibranchs.";
