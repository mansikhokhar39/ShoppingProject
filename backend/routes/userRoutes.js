const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// =====================
// SIGNUP
// =====================
router.post("/", async (req, res) => {
  let { username, password } = req.body;

  // ✅ normalize
  username = username.trim().toLowerCase();
  password = password.trim();

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      token: null
    });

    res.json({
      message: "Signup successful",
      userId: user._id
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed" });
  }
});

// =====================
// LOGIN
// =====================
router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  // ✅ normalize
  username = username.trim().toLowerCase();
  password = password.trim();

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.token = token;
    await user.save();

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

// =====================
// LOGOUT
// =====================
router.post("/logout", async (req, res) => {
  const token = req.headers.authorization;

  try {
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    user.token = null;
    await user.save();

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Logout failed" });
  }
});

module.exports = router;
