const express = require("express");        // Web framework for creating APIs
const mongoose = require("mongoose");      // MongoDB object modeling tool
const bodyParser = require("body-parser"); // Middleware to parse incoming JSON requests
require('dotenv').config();                // Load environment variables from .env file

const app = express(); // Initialize Express app

// =======================
// CORS Setup (Manual)
// =======================
// Allows cross-origin requests from any domain (*)
// In production, it's better to specify allowed origins for security
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Replace * with specific domain in production
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// =======================
// Middleware
// =======================
app.use(bodyParser.json()); // Parse JSON request bodies

// =======================
// Database Connection
// =======================
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// =======================
// Routes
// =======================
app.use("/api/auth", require("./routes/authRoutes"));       // Authentication routes
app.use("/api/user", require("./routes/userRoutes"));       // User-related routes
app.use("/api/profile", require("./routes/profileRoutes")); // Profile management routes

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000; // Use env port or default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
