// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const gadgetSchema = require("./schemas/gadgetSchema");
const Gadget = require("./models/Gadget");
// Create Express app
const app = express();

// Port
const port = process.env.PORT || 5000;
// Load environment variables
dotenv.config();

//MiddleWares
app.use(express.json());
app.use(cors());
// Routes
const gadgetRoute = require("./routes/gadget.route");
const versionRoute = require("./routes/versions.route");
// Connect to MongoDB database
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Failed to connect to database", err));

// Define route schema
gadgetSchema;

// Define route model
Gadget;

// Route for index
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Define endpoint for getting all bus routes
app.use("/api/v1/gadgets", gadgetRoute);
app.use("/api/v1/version", versionRoute);

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
