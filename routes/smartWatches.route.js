const express = require("express");
const router = express.Router();
const smartWatchesController = require("../controllers/smartWatches.controller");
const whiteListedDomain = require("../middleware/whiteListedDomain");

router.get(
  "/",
  whiteListedDomain,
  smartWatchesController.getSmartWatchesByBrand
);
router.get(
  "/details",
  whiteListedDomain,
  smartWatchesController.getSmartWatchesByName
);
router.get(
  "/brands",
  whiteListedDomain,
  smartWatchesController.getAllSmartWatchesBrands
);
router.get(
  "/search",
  whiteListedDomain,
  smartWatchesController.searchSmartWatchesByTitle
);

module.exports = router;
