const { default: mongoose } = require("mongoose");
const mobileSchema = require("../schemas/gadgetSchema");

const Mobile = mongoose.model("Mobile", mobileSchema, "gadgets");
module.exports = Mobile;
