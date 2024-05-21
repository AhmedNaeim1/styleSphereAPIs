const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    productID: { type: String, required: true, },
    businessID: { type: String, required: true, },
    name: { type: String, required: true },
    description: { type: String, required: true },
    condition: { type: String, required: true },
    material: { type: String, required: true },
    styleAndOccasion: [{ type: String, required: true }],
    category: { type: String, required: true },
    price: { type: Number, required: true },
    sizes: [{ type: String, required: true }],
    quantities: [{ type: String, required: true }],
    colors: [{ type: String, required: true }],
    imageUrls: [{ type: String, required: true }],
    type: [{ type: String, required: true }],
    dateAdded: { type: Date, default: Date.now } 
  },
  { collection: "products" }
);

const Product = mongoose.model("Products", productSchema);

module.exports = Product;
