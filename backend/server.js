const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/users", userRoutes);
app.use("/items", itemRoutes);
app.use("/carts", cartRoutes);
app.use("/orders", orderRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Shopping Cart Backend Running ✅");
});

// db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => {
    console.log("Mongo Error:", err.message);
    console.log("⚠️ Server running without DB connection (local issue)");
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
