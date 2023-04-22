const { default: mongoose } = require("mongoose");

// Define mobile schema
const mobileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  imageURL: { type: String, required: true },
  rating: { type: Number, min: 0, max: 10, required: true },
  specifications: [],
  pricing: [],
});
module.exports = mobileSchema;
