const Gadget = require("../models/Gadget");

const getAllGadgetBrands = async (req, res) => {
  /*
  if api call: /api/gadgets/brands (here, it will show 10 items)
  if api call: /api/gadgets/brands?page=all (here, it shows all items)
  if api call: /api/gadgets/brands?page=1&limit=5 (here, page=current page, limit=how many results will be displayed)
  */
  const page = req.query.page === "all" ? "all" : parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const allBrands = await Gadget.distinct("brand");
    const totalBrands = allBrands.length;
    const totalPages = Math.ceil(totalBrands / limit);

    let formattedBrands;
    if (page === "all") {
      formattedBrands = allBrands.map((brand) => ({ brandName: brand }));
      res.json({
        status: true,
        brands: formattedBrands,
        total_count: totalBrands,
      });
    } else {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const brandsToShow = allBrands.slice(startIndex, endIndex);
      formattedBrands = brandsToShow.map((brand) => ({ brandName: brand }));

      res.json({
        status: true,
        brands: formattedBrands,
        total_count: totalBrands,
        total_pages: totalPages,
        current_page: page,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getGadgetByBrand = async (req, res) => {
  /* 
if api call: /api/v1/gadgets?brandName=apple&page=1&limit=10 (here, brandName=brand name, page=current page, limit=how many results will be displayed)
if api call: /api/v1/gadgets?gadget=all&page=1&limit=10 (here, phone=all means all phone will be displayed, page=current page, limit=how many results will be displayed)
  */
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const brandName = req.query.brandName;
  const gadget = req.query.gadget;
  let filter = {};
  if (brandName) {
    filter["brand"] = { $eq: brandName };
  }
  if (gadget === "all") {
    filter = {};
  }
  const totalCount = await Gadget.countDocuments(filter);

  const data = await Gadget.find(filter).skip(skip).limit(limit);

  // Calculate total number of pages
  const totalPages = Math.ceil(totalCount / limit);

  res.json({
    status: true,
    data: data,
    total_count: totalCount,
    total_pages: totalPages,
    current_page: page,
  });
};
//get details
const getGadgetDetails = async (req, res) => {
  /* 
if api call: api/v1/gadgets/details?gadget=Apple iPhone 7 Plus (here, phoneName = phone's model name. it will show only one result)
  */
  const gadget = req.query.gadget;

  const filter = {};
  if (gadget) {
    filter["title"] = { $regex: new RegExp(gadget) };
  }

  const data = await Gadget.findOne(filter);

  if (data) {
    res.json({
      status: true,
      data: data,
    });
  } else {
    res.json({
      status: false,
      message: "data not found",
    });
  }
};

const searchGadgetByTitle = async (req, res) => {
  /*
  if api call: /api/v1/gadgets/search?keyword=apple (here, all apple devices will be shown)
  if api call: /api/v1/gadgets/search?keyword=apple&page=1&limit=10 (here, all apple devices will be shown but with pagination and, page=current page, limit=how many results will be displayed)
  if api call: /api/v1/gadgets/search?show=all&page=1&limit=10 (here, all Gadget devices will be shown but with pagination and, page=current page, limit=how many results will be displayed)
  */
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const keyword = req.query.keyword;

  const filter = {};
  if (req.query.show === "all") {
    // If the "show" query parameter is "all", don't apply any filters
  } else if (keyword) {
    filter["title"] = { $regex: keyword, $options: "i" };
  }

  const totalCount = await Gadget.countDocuments(filter);

  const data = await Gadget.find(filter).skip(skip).limit(limit);
  // Calculate total number of pages
  const totalPages = Math.ceil(totalCount / limit);
  if (totalCount) {
    res.json({
      status: true,
      data: data,
      total_count: totalCount,
      total_pages: totalPages,
      current_page: page,
    });
  } else {
    {
      res.json({
        status: false,
        message: "No results found",
      });
    }
  }
};
const getFilteredGadgetsByCategory = async (req, res) => {
  /*
  if api call: /api/gadgets?show=smartPhone&page=1&limit=5 (here, page=current page, limit=how many results will be displayed)
  show's value: smartPhone, smartWatch, all
  */
  const category = req.query.show;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    let allGadgets;
    if (category === "smartWatch") {
      allGadgets = await Gadget.find({ category: "Smart Watch" });
    } else if (category === "smartPhone") {
      allGadgets = await Gadget.find({ category: "Smartphone" });
    } else if (category === "all") {
      allGadgets = await Gadget.find({});
    } else {
      return res.status(400).json({ error: "Invalid category specified" });
    }

    const totalGadgets = allGadgets.length;
    const totalPages = Math.ceil(totalGadgets / limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const gadgetsToShow = allGadgets.slice(startIndex, endIndex);

    res.json({
      status: true,
      gadgets: gadgetsToShow,
      total_count: totalGadgets,
      total_pages: totalPages,
      current_page: page,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllGadgetBrands,
  getGadgetByBrand,
  getGadgetDetails,
  searchGadgetByTitle,
  getFilteredGadgetsByCategory,
};
