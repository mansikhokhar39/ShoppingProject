const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,      // 🔥 यही main fix
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  }
});

// force unique index
userSchema.index({ username: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);
