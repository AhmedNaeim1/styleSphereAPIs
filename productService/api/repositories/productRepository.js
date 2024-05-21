const Product = require("../model/product");
const mongoose = require("mongoose");

// Retrieve product details by productID
async function getProduct(productID) {
  try {
    if (!mongoose.Types.ObjectId.isValid(productID)) {
      throw new Error("Invalid productID format");
    }
    const product = await Product.findById(productID);
    return product;
  } catch (error) {
    throw error;
  }
}

// Update product information by productID
async function updateProduct(productID, productData) {
  try {
    const product = await Product.findByIdAndUpdate(productID, productData, { new: true });
    return product;
  } catch (error) {
    throw error;
  }
}

// Delete product by productID
async function deleteProduct(productID) {
  try {
    await Product.findByIdAndDelete(productID);
  } catch (error) {
    throw error;
  }
}

// Retrieve all products
async function getAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw error;
  }
}

// Retrieve products by category
async function getProductsByCategory(category) {
  try {
    const products = await Product.find({ category });
    return products;
  } catch (error) {
    throw error;
  }
}

// Retrieve products by businessID
async function getProductsByBusiness(businessID) {
  try {
    
    const products = await Product.find({ businessID });
    return products;
  } catch (error) {
    throw error;
  }
}

// Create a new product
async function addProduct(productData) {
  try {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      ...productData
    });
    await product.save();
    return product;
  } catch (error) {
    throw error;
  }
}

// // Retrieve all products with virtual try-on enabled
// async function getProductsWithVirtualTryOn() {
//   try {
//     const products = await Product.find({ virtualTryOn: true });
//     return products;
//   } catch (error) {
//     throw error;
//   }
// }

module.exports = {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductsByCategory,
  getProductsByBusiness,
  // getProductsWithVirtualTryOn
};
