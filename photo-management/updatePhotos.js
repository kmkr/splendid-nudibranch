const fs = require("fs");

const db = require("../server/db/index");
const deletePhotoHandler = require("../server/photos/delete/index");
const updatePhotoHandler = require("../server/photos/update/index");

const localPhotoContent = require("../content.json");

function isChanged(server, local) {
  return Object.keys(local).some((key) => {
    if (Array.isArray(local[key]) || Array.isArray(server[key])) {
      return (server[key] || []).toString() !== (local[key] || []).toString();
    }

    if (server[key] !== local[key]) {
      return true;
    }

    return false;
  });
}

(async function () {
  const photosOnServer = await db.list("photos");

  await Promise.all(
    localPhotoContent.map((localPhotoEntry) => {
      const serverPhotoEntry = photosOnServer.find(
        (p) => p.key === localPhotoEntry.key
      );

      if (!serverPhotoEntry) {
        throw new Error(
          `Unable to find ${localPhotoEntry.key} on server! Deleted without updating content? Exiting ...`
        );
      }

      if (isChanged(serverPhotoEntry, localPhotoEntry)) {
        console.log(
          "Updating outdated item %o with %o",
          serverPhotoEntry,
          localPhotoEntry
        );

        return updatePhotoHandler(localPhotoEntry.key, localPhotoEntry);
      }

      return Promise.resolve();
    })
  );

  const deletedPhotos = photosOnServer.filter(
    (ps) => !localPhotoContent.find((lp) => lp.key === ps.key)
  );

  if (deletedPhotos.length) {
    const dryRun = !process.argv.some((a) => a === "--delete");

    console.log("These photos are deleted locally. Deleting on server ...");
    console.log(deletedPhotos);
    if (dryRun) {
      console.log("dry run, won't delete");
    } else {
      await Promise.all(deletedPhotos.map((p) => deletePhotoHandler(p.key)));
    }
  }

  process.exit();
})();
