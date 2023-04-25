const express = require("express");
const router = express.Router();
const gadgetController = require("../controllers/gadget.controller");
const whiteListedDomain = require("../middleware/whiteListedDomain");

router.get("/", whiteListedDomain, gadgetController.getGadgetByBrand);
router.get("/details", whiteListedDomain, gadgetController.getGadgetDetails);
router.get("/brands", whiteListedDomain, gadgetController.getAllGadgetBrands);
router.get("/search", whiteListedDomain, gadgetController.searchGadgetByTitle);
router.get(
  "/category",
  whiteListedDomain,
  gadgetController.getFilteredGadgetsByCategory
);

module.exports = router;
