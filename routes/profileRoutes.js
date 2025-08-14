const express = require("express"); // Web framework for creating routes
const Profile = require("../models/Profile"); // Mongoose Profile model
const router = express.Router(); // Create a new router instance

// =======================
// POST /api/profile
// =======================
router.post("/", async (req, res) => {
  try {
    const { userId, name, height, weight, goal, notes } = req.body; // Extract profile data

    // Ensure userId is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find profile by userId and update it, or create a new one if it doesn't exist
    const profile = await Profile.findOneAndUpdate(
      { userId },                      // Match by userId
      { name, height, weight, goal, notes }, // New profile data
      { new: true, upsert: true }      // Return updated doc & create if not found
    );

    res.json({ message: "Profile saved successfully", profile });
  } catch (err) {
    console.error("Profile save error:", err);
    res.status(500).json({ message: "Failed to save profile" });
  }
});

module.exports = router; // Export router for use in main app
