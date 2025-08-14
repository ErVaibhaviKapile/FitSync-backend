// models/Profile.js
const mongoose = require("mongoose"); // Mongoose handles MongoDB models & schemas

// Defining the shape of our Profile document
const profileSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, // Reference to a User document
    ref: "User",                          // Explicitly tells Mongoose which model to link to
    required: true                        // Can't have a profile without a user
  },
  name: String,     // Full name of the person
  height: String,   // Height in cm (could be stored as a number, but keeping as string for now)
  weight: String,   // Weight in kg (again, string for simplicity)
  goal: String,     // Fitness goal text
  notes: String     // Any medical conditions or personal notes
});

// Creating the model to actually interact with the 'profiles' collection
module.exports = mongoose.model("Profile", profileSchema);
