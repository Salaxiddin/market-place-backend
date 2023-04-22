const Versions = require("../models/Versions");

const getVersions = async (req, res) => {
  const version = req.query.version;

  const filter = {};

  if (version) {
    filter.version = version;
  }

  const versionDetails = await Versions.findOne(filter);

  if (!versionDetails) {
    return res.json({
      message: "No results found",
    });
  }

  res.json({
    versionDetails,
  });
};

module.exports = {
  getVersions,
};
