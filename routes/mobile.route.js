const express = require("express");
const router = express.Router();
const mobileController = require("../controllers/mobile.controller");
const whiteListedDomain = require("../middleware/whiteListedDomain");

router.get("/", whiteListedDomain, mobileController.getMobileByBrand);
router.get(
  "/details",
  whiteListedDomain,
  mobileController.getMobileByPhoneName
);
router.get("/brands", whiteListedDomain, mobileController.getAllMobileBrands);
router.get("/search", whiteListedDomain, mobileController.searchMobilesByTitle);

module.exports = router;
