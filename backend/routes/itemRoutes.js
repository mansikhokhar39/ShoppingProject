const express = require("express");
const Item = require("../models/Item");

const router = express.Router();

/*
  GET ALL ITEMS
  - Kabhi crash nahi karega
  - DB empty ho to empty array bhejega
  - Error ho to proper JSON error dega
*/
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();

    // Agar DB empty ho
    if (!items || items.length === 0) {
      return res.json([]);
    }

    res.json(items);
  } catch (error) {
    console.error("GET /items error:", error.message);
    res.status(500).json({
      message: "Failed to fetch items"
    });
  }
});

/*
  CREATE ITEM (optional, for testing/admin use)
*/
router.post("/", async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.json(item);
  } catch (error) {
    console.error("POST /items error:", error.message);
    res.status(500).json({
      message: "Failed to create item"
    });
  }
});

module.exports = router;
