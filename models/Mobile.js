const { default: mongoose } = require("mongoose");
const mobileSchema = require("../schemas/MobileSchema");

const Mobile = mongoose.model("Mobile", mobileSchema, "mobilePhones");
module.exports = Mobile;
