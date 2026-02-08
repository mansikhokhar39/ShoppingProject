const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

const router = express.Router();

/* ---------------- PLACE ORDER ---------------- */
router.post("/", async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }

    const order = await Order.create({
      userId,
      items: cart.items
    });

    await Cart.deleteOne({ userId });

    res.json(order);
  } catch (err) {
    console.error("Order POST error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- ORDER HISTORY ---------------- */
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .populate("items.itemId");

    res.json(orders);
  } catch (err) {
    console.error("Order GET error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
