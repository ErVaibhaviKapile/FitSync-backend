const User = require("../models/User");
const bcrypt = require("bcrypt");

// ----------------------
// REGISTER a new user
// ----------------------
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1️⃣ Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2️⃣ Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Create new user document
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    // 4️⃣ Save user to database
    await newUser.save();

    // 5️⃣ Send success response
    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    // ❌ Internal server error
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------------
// LOGIN existing user
// ----------------------
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️⃣ Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2️⃣ Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3️⃣ Login successful → send back user data
    res.json({ message: "Login successful", user });

  } catch (err) {
    // ❌ Internal server error
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
