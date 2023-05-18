const express = require("express");
const router = express.Router();
const gadgetController = require("../controllers/gadget.controller");
const whiteListedDomain = require("../middleware/whiteListedDomain");

router.get("/", gadgetController.getGadgetByBrand);
router.get("/details", gadgetController.getGadgetDetails);
router.get("/brands", gadgetController.getAllGadgetBrands);
router.get("/search", gadgetController.searchGadgetByTitle);
router.get(
  "/category",
  whiteListedDomain,
  gadgetController.getFilteredGadgetsByCategory
);

module.exports = router;
