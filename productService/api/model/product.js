const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    productID: { type: String, required: true },
    businessID: { type: String, required: true },
    gender: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    condition: { type: String, required: true },
    material: { type: String, required: true },
    category: { type: String, required: true },
    season: { type: String, required: true },
    price: { type: Number, required: true },
    sizes: { type: String, required: true },
    quantities: { type: String, required: true },
    colors: { type: String, required: true },
    type: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now },
    imageUrls: [{ type: String, required: true }],
  },
  { collection: "products" }
);

module.exports = mongoose.model('Product', productSchema);


const Product = mongoose.model("Products", productSchema);

module.exports = Product;
