const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

/* ---------------- ADD ITEM / INCREASE QTY ---------------- */
router.post("/", async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ message: "itemId is required" });
    }

    const userId = req.userId;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ itemId, qty: 1 }]
      });
    } else {
      const existing = cart.items.find(
        i => i.itemId.toString() === itemId
      );

      if (existing) {
        existing.qty += 1;
      } else {
        cart.items.push({ itemId, qty: 1 });
      }

      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    console.error("Cart POST error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- GET CART ---------------- */
router.get("/", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId })
      .populate("items.itemId");

    res.json(cart || { items: [] });
  } catch (err) {
    console.error("Cart GET error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ REMOVE ITEM FROM CART (POST based – SAFE)
router.post("/remove", async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      i => i.itemId.toString() !== itemId
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item" });
  }
});


// ✅ GET CART (WITH POPULATE)
router.get("/", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId })
      .populate("items.itemId");

    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: "Failed to load cart" });
  }
});
module.exports = router;
