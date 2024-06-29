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

// Function to retrieve multiple products by their IDs
async function getProducts(productIDs) {
  try {
    const products = await Product.find({ productID: { $in: productIDs } });
    return products;
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

// Retrieve all products with a limit of 20
// async function getAllProducts() {
//   try {
//     const products = await Product.find().limit(20);
//     return products;
//   } catch (error) {
//     throw error;
//   }
// }
// Retrieve the most recently added products with a limit of 20
async function getAllProducts() {
  try {
    const products = await Product.find().sort({ dateAdded: 1 }).limit(20);
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

// Retrieve products by businessID and sort by most recently added
async function getProductsByBusiness(businessID) {
  try {
    console.log(`Querying products for businessID: ${businessID}`); // Debugging
    const products = await Product.find({ businessID: businessID }).sort({ dateAdded: -1 });
    console.log(`Products found: ${products.length}`); // Debugging
    return products;
  } catch (error) {
    console.error(`Error querying products for businessID: ${businessID}`, error); // Debugging
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
  getProducts,
  // getProductsWithVirtualTryOn
};
