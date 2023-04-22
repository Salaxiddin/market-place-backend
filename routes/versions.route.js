const express = require("express");
const router = express.Router();
const versionController = require("../controllers/versions.controller");
const whiteListedDomain = require("../middleware/whiteListedDomain");

router.get("/", whiteListedDomain, versionController.getVersions);

module.exports = router;
