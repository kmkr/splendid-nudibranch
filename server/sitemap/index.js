const express = require("express");
const sm = require("sitemap");
const { getPhotoData } = require("../view-data-service");

const router = express.Router();

router.get("/", (req, res) => {
  getPhotoData().then(({ photos }) => {
    const sitemap = sm.createSitemap({
      hostname: "http://www.thesplendidnudibranch.pink",
      cacheTime: 600000,
      urls: [
        {
          url: "//",
        },
        ...photos.map((photo) => ({
          url: `/photos/${photo.key}`,
        })),
      ],
    });
    sitemap.toXML(function (err, xml) {
      if (err) {
        return res.status(500).end();
      }

      res.header("Content-Type", "application/xml");
      res.send(xml);
    });
  });
});

module.exports = router;
