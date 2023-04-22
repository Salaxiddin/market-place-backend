const { default: mongoose } = require("mongoose");
const versionSchema = require("../schemas/VersionsSchema");

const Versions = mongoose.model("Versions", versionSchema, "versions");
module.exports = Versions;
