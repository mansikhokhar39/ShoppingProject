const mongoose = require("mongoose");
require("dotenv").config();
const Item = require("./models/Item");

async function seedItems() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    // Purane items clear
    await Item.deleteMany();

    const items = [
      // 🔌 Electronics
      {
        name: "Laptop",
        price: 55000,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
      },
      {
        name: "Gaming Laptop",
        price: 85000,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302"
      },
      {
        name: "Mobile Phone",
        price: 25000,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
      },
      {
        name: "Smartphone Pro",
        price: 45000,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97"
      },
      {
        name: "Tablet",
        price: 30000,
        image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04"
      },
      {
        name: "Smart Watch",
        price: 7000,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
      },
      {
        name: "Bluetooth Speaker",
        price: 3500,
        image: "https://images.unsplash.com/photo-1585386959984-a41552231693"
      },
      {
        name: "Headphones",
        price: 3000,
        image: "https://images.unsplash.com/photo-1518441902113-f57bce86a7b1"
      },
      {
        name: "Wireless Earbuds",
        price: 5000,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df"
      },
      {
        name: "Power Bank",
        price: 1500,
        image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6"
      },

      // 🖥️ Computer Accessories
      {
        name: "Keyboard",
        price: 2000,
        image: "https://images.unsplash.com/photo-1587825140400-8f9c0c5f6d73"
      },
      {
        name: "Mechanical Keyboard",
        price: 4500,
        image: "https://images.unsplash.com/photo-1612197527276-0b7e4a0d7c1c"
      },
      {
        name: "Mouse",
        price: 800,
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7"
      },
      {
        name: "Gaming Mouse",
        price: 2500,
        image: "https://images.unsplash.com/photo-1608219959300-a1f1b58a29e0"
      },
      {
        name: "Monitor 24 inch",
        price: 12000,
        image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04"
      },
      {
        name: "Monitor 27 inch",
        price: 18000,
        image: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc"
      },
      {
        name: "Webcam",
        price: 2200,
        image: "https://images.unsplash.com/photo-1616627981436-b9cc44204b93"
      },
      {
        name: "USB Hub",
        price: 900,
        image: "https://images.unsplash.com/photo-1587825140797-4c709f7bdb11"
      },
      {
        name: "External Hard Drive",
        price: 6000,
        image: "https://images.unsplash.com/photo-1602524811504-18f97c8b3d95"
      },
      {
        name: "SSD 1TB",
        price: 7500,
        image: "https://images.unsplash.com/photo-1623282033815-40b05d96c903"
      },

      // 🎧 Audio & Video
      {
        name: "Home Theatre",
        price: 22000,
        image: "https://images.unsplash.com/photo-1585386959984-a41552231693"
      },
      {
        name: "Sound Bar",
        price: 14000,
        image: "https://images.unsplash.com/photo-1590701881851-5e6c3a6bca4a"
      },
      {
        name: "Wireless Microphone",
        price: 3000,
        image: "https://images.unsplash.com/photo-1590608897129-79da98d15969"
      },
      {
        name: "DSLR Camera",
        price: 52000,
        image: "https://images.unsplash.com/photo-1519183071298-a2962be96c05"
      },
      {
        name: "Action Camera",
        price: 18000,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
      },
      {
        name: "Tripod Stand",
        price: 1200,
        image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc"
      },
      {
        name: "Ring Light",
        price: 2500,
        image: "https://images.unsplash.com/photo-1602524206252-7b9b3e0e18e6"
      },

      // 🏠 Home & Office
      {
        name: "Office Chair",
        price: 9000,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
      },
      {
        name: "Study Table",
        price: 6500,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
      },
      {
        name: "Table Lamp",
        price: 1200,
        image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4"
      },
      {
        name: "Air Purifier",
        price: 11000,
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952"
      },
      {
        name: "Room Heater",
        price: 3500,
        image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7"
      },
      {
        name: "Electric Kettle",
        price: 1800,
        image: "https://images.unsplash.com/photo-1606791405797-3b6c2a69e2b6"
      },

      // 🎮 Gaming
      {
        name: "Gaming Console",
        price: 42000,
        image: "https://images.unsplash.com/photo-1606813909355-44e8c185d7cf"
      },
      {
        name: "Game Controller",
        price: 3500,
        image: "https://images.unsplash.com/photo-1606813909355-44e8c185d7cf"
      },
      {
        name: "Racing Wheel",
        price: 9500,
        image: "https://images.unsplash.com/photo-1625782431599-3cb6ec0c3c30"
      },
      {
        name: "VR Headset",
        price: 28000,
        image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac"
      }
    ];

    await Item.insertMany(items);
    console.log(`✅ ${items.length} items seeded successfully`);

    process.exit(0);
  } catch (err) {
    console.error("Seeding failed", err);
    process.exit(1);
  }
}

seedItems();
