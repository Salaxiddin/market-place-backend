// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const Mobile = require("./models/Mobile");
// Create Express app
const app = express();

// Port
const port = process.env.PORT || 5000;
// Load environment variables
dotenv.config();

//MiddleWares
app.use(express.json());
app.use(cors());

// Routes Schema, Models
const mobileRoute = require("./routes/mobile.route");
const smartWatchesRoute = require("./routes/smartWatches.route");
const versionRoute = require("./routes/versions.route");
const mobileSchema = require("./schemas/MobileSchema");
const smartWatchesSchema = require("./schemas/SmartWatchesSchema");
const SmartWatches = require("./models/SmartWatches");
// Connect to MongoDB database
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Failed to connect to database", err));

// Define schema
mobileSchema;
smartWatchesSchema;

// Define model
Mobile;
SmartWatches;
// Route for index
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Define endpoint for getting all bus routes
app.use("/api/v1/mobile", mobileRoute);
app.use("/api/v1/smartWatches", smartWatchesRoute);
app.use("/api/v1/version", versionRoute);

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
