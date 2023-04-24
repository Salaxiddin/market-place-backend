const Mobile = require("../models/Mobile");

const getAllMobileBrands = async (req, res) => {
  /*
  if api call: /api/mobile/brands (here, it will show 10 items)
  if api call: /api/mobile/brands?page=all (here, it shows all items)
  if api call: /api/mobile/brands?page=1&limit=5 (here, page=current page, limit=how many results will be displayed)
  */
  const page = req.query.page === "all" ? "all" : parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const allBrands = await Mobile.distinct("brand");
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
const getMobileByBrand = async (req, res) => {
  /* 
if api call: /api/v1/mobile?brandName=apple&page=1&limit=10 (here, brandName=brand name, page=current page, limit=how many results will be displayed)
if api call: /api/v1/mobile?phone=all&page=1&limit=10 (here, phone=all means all phone will be displayed, page=current page, limit=how many results will be displayed)
  */
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const brandName = req.query.brandName;
  const phone = req.query.phone;
  let filter = {};
  if (brandName) {
    filter["brand"] = { $eq: brandName };
  }
  if (phone === "all") {
    filter = {};
  }
  const totalCount = await Mobile.countDocuments(filter);

  const mobiles = await Mobile.find(filter).skip(skip).limit(limit);

  // Calculate total number of pages
  const totalPages = Math.ceil(totalCount / limit);

  res.json({
    status: true,
    data: mobiles,
    total_count: totalCount,
    total_pages: totalPages,
    current_page: page,
  });
};
const getMobileByPhoneName = async (req, res) => {
  /* 
if api call: api/v1/mobile/details?phoneName=Apple iPhone 7 Plus (here, phoneName = phone's model name. it will show only one result)
  */
  const phoneName = req.query.phoneName;

  const filter = {};
  if (phoneName) {
    filter["title"] = { $regex: new RegExp(phoneName, "i") };
  }

  const mobile = await Mobile.findOne(filter);

  if (mobile) {
    res.json({
      status: true,
      data: mobile,
    });
  } else {
    res.json({
      status: false,
      message: "Mobile phone not found",
    });
  }
};
const searchMobilesByTitle = async (req, res) => {
  /*
  if api call: /api/v1/mobile/search?phone=apple (here, all apple devices will be shown)
  if api call: /api/v1/mobile/search?phone=apple&page=1&limit=10 (here, all apple devices will be shown but with pagination and, page=current page, limit=how many results will be displayed)
  if api call: /api/v1/mobile/search?show=all&page=1&limit=10 (here, all mobile devices will be shown but with pagination and, page=current page, limit=how many results will be displayed)
  */
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const keyword = req.query.phone;

  const filter = {};
  if (req.query.show === "all") {
    // If the "show" query parameter is "all", don't apply any filters
  } else if (keyword) {
    filter["title"] = { $regex: keyword, $options: "i" };
  }

  const totalCount = await Mobile.countDocuments(filter);

  const mobiles = await Mobile.find(filter).skip(skip).limit(limit);
  // Calculate total number of pages
  const totalPages = Math.ceil(totalCount / limit);
  if (totalCount) {
    res.json({
      status: true,
      data: mobiles,
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

module.exports = {
  getAllMobileBrands,
  getMobileByBrand,
  getMobileByPhoneName,
  searchMobilesByTitle,
};
