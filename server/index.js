const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({path: '.env.local'});
dotenv.config();

// Create an Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a simple schema and model for items
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});
const Item = mongoose.model("Item", itemSchema);

app.get("/", async (req, res) => {
  res.send("Server is running...");
});

// CRUD Operations

// Create
app.post("/items", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

// Read
app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Update
app.put("/items/:id", async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedItem);
});

// Delete
app.delete("/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
