const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/test");
    console.log("MongoDB connected");
  } catch (err) {
    console.log("Database connection error:", err);
  }
}

module.exports = connectDB;
