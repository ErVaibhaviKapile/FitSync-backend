const User = require("../models/User");

// ----------------------
// GET user profile by ID
// ----------------------
exports.getProfile = async (req, res) => {
  // 1️⃣ Extract user ID from query parameter
  //    In production, this would typically come from authentication middleware instead
  const userId = req.query.id;

  try {
    // 2️⃣ Find user in DB by ID and exclude password field
    const user = await User.findById(userId).select("-password");

    // 3️⃣ If user not found, send 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 4️⃣ Send user profile data as JSON
    res.json(user);

  } catch (err) {
    // ❌ Catch and log any server/database errors
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
