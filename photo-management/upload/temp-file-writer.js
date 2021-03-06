const fs = require("fs");
const idGenerator = require("./id-generator");

module.exports = (file) => {
  const temp = "/tmp";
  const tempFile = `${temp}/${idGenerator.id()}_${file.originalname}`;
  return new Promise((resolve, reject) => {
    console.log("[temp-file-writer] Writing %s", tempFile);
    fs.writeFile(tempFile, file.buffer, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve({
        path: tempFile,
      });
    });
  });
};
