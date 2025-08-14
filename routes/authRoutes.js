const express = require("express"); // Web framework for handling HTTP requests
const bcrypt = require("bcrypt");   // Library for hashing & comparing passwords
const User = require("../models/User"); // Mongoose User model

const router = express.Router(); // Create a new Express router

// =======================
// POST /api/auth/signup
// =======================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body; // Extract user data from request body

    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save(); // Save user to DB

    res.status(201).json({ message: "User created", userId: newUser._id });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =======================
// POST /api/auth/login
// =======================
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // Extract login credentials

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Successful login
    res.json({ message: "Login successful", userId: user._id });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router; // Export the router to be used in main server file
