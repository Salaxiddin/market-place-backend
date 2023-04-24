const { default: mongoose } = require("mongoose");
const smartWatchesSchema = require("../schemas/SmartWatchesSchema");

const SmartWatches = mongoose.model(
  "SmartWatches",
  smartWatchesSchema,
  "smartWatches"
);
module.exports = SmartWatches;
