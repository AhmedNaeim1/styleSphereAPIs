// Import necessary modules
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Define routes for product management

// Retrieves product details by productID
router.get("/:productID", productController.getProduct);

// Retrieves products details by productID
router.post("/list", productController.getMultipleProducts);

// Updates product information by productID
router.put("/:productID", productController.updateProduct);

// Deletes a product by productID
router.delete("/:productID", productController.deleteProduct);

// Retrieves a list of all products
router.get("/", productController.getAllProducts);

// Retrieves products by category
router.get("/category", productController.getProductsByCategory);

// Retrieves products by businessID
router.get("/business/:businessID", productController.getProductsByBusiness);

router.post("/", productController.addProduct);


// Retrieves all products that have virtual try-on enabled
// router.get("/products/virtualTryOn", productController.getProductsWithVirtualTryOn);

module.exports = router;
