const express = require("express"); // Web framework for routing
const router = express.Router();    // Create new router instance
const auth = require("../middleware/authMiddleware"); // Middleware for authentication
const User = require("../models/User"); // Mongoose User model

// =======================
// GET /api/user/me
// =======================
// Protected route to get logged-in user's profile (excluding password)
router.get("/me", auth, async (req, res) => {
  try {
    // Find user by ID from the request (set by auth middleware) and exclude password field
    const user = await User.findById(req.user).select("-password");

    res.json(user); // Return user data
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router; // Export router to be used in main app
