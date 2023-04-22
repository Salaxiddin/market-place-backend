const { default: mongoose } = require("mongoose");

// Define bus route schema
const versionsSchema = new mongoose.Schema({
  version: String,
  updateRequired: Boolean,
  updateURL: String,
  message: String,
});
module.exports = versionsSchema;
