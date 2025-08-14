const mongoose = require("mongoose"); // Import Mongoose for MongoDB object modeling

// Define the User schema structure
const userSchema = new mongoose.Schema({
  name: {
    type: String,     // User's full name
    required: true,   // Name is mandatory
    trim: true,       // Removes extra spaces from start/end
  },
  email: {
    type: String,     // User's email address
    required: true,   // Email is mandatory
    unique: true,     // No two users can share the same email
    lowercase: true,  // Automatically store email in lowercase
  },
  password: {
    type: String,     // Hashed password (never store plain text)
    required: true,   // Password is mandatory
  },
}, {
  timestamps: true,   // Automatically adds createdAt & updatedAt fields
});

// Create and export the User model for database interaction
module.exports = mongoose.model("User", userSchema);
