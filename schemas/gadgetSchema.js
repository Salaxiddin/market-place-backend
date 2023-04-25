const { default: mongoose } = require("mongoose");

// Define mobile schema
const mobileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  imageURL: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  specifications: [],
});
module.exports = mobileSchema;
