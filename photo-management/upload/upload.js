const fs = require("fs");
const path = require("path");

const idGenerator = require("./id-generator");
const s3Uploader = require("../../server/photos/s3/s3-uploader");
const { resize, metadata: getMetadata } = require("./gm");
const tempFileWriter = require("./temp-file-writer");
const db = require("../../server/db");
const { base } = require("../../server/photos/constants");
const { resizeTo } = require("../../server/photos/constants");
const photoDataFormatter = require("../../server/photos/photo-data-formatter");
const { insert } = require("../../server/db");

function resizeToMultiple(path) {
  return resizeTo.map((r) => resize(path, r.width, r.name));
}

function getShortNameFromName(name) {
  return resizeTo.find((r) => r.name === name).shortName;
}

function generateFilePath(id, extension, resizeKey) {
  return `${id}/mostlyanimals_${id}_${resizeKey}${extension}`;
}

function upload(id, file, resizedResults) {
  const mimetype = file.mimetype;

  function upl(resizeKey, buffer) {
    const extension = path.parse(file.originalname).ext;
    const fileNameWithPath = generateFilePath(id, extension, resizeKey);
    return s3Uploader(buffer, fileNameWithPath, mimetype);
  }

  return resizeTo.map((r, index) =>
    upl(r.shortName, resizedResults[index].buffer)
  );
}

function insertToDb(id, file, additionalData) {
  const photo = {
    key: id,
    name: file.originalname,
    ...additionalData,
  };

  console.log("Inserting photo:");
  console.log(photo);
  return db.insert("photos", photo).then(() => photo);
}

async function processFile(filePath) {
  const buffer = fs.readFileSync(filePath);
  const file = {
    buffer,
    originalname: path.parse(filePath).base,
    mimetype: "image/jpeg", // Watch out!
  };
  const fileExtension = path.parse(filePath).ext;
  const id = idGenerator.id();
  let tempFilePath;
  const resizedResults = await tempFileWriter(file).then(({ path }) => {
    tempFilePath = path;
    return Promise.all(resizeToMultiple(tempFilePath));
  });
  await Promise.all(upload(id, file, resizedResults));

  const resize = resizedResults
    .map(({ sizeLabel, width, height }) => ({
      sizeLabel,
      width,
      height,
    }))
    .reduce((prevVal, nextVal) => {
      prevVal[nextVal.sizeLabel] = {
        height: nextVal.height,
        width: nextVal.width,
        path: generateFilePath(
          id,
          fileExtension,
          getShortNameFromName(nextVal.sizeLabel)
        ),
      };

      return prevVal;
    }, {});
  const metadata = await getMetadata(tempFilePath).then((md) => ({
    resize,
    ...md,
  }));
  return insertToDb(id, file, metadata);
}

(async function () {
  const filePaths = process.argv.filter((a) =>
    a.toLowerCase().endsWith(".jpg")
  );

  for (let filePath of filePaths) {
    console.log("Processing", filePath);
    const photo = await processFile(filePath);
    console.log("Processing complete");
  }
  process.exit();
})();
