const productRepository = require("../repositories/productRepository");

// GET /products/{productID} - Retrieves product details
async function getProduct(req, res) {
  try {
    const product = await productRepository.getProduct(req.params._id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// POST /products - Adds a new product
async function addProduct(req, res) {
  try {
    const product = await productRepository.addProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// PUT /products/{productID} - Updates product information
async function updateProduct(req, res) {
  try {
    const product = await productRepository.updateProduct(req.params.productID, req.body);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// DELETE /products/{productID} - Deletes a product
async function deleteProduct(req, res) {
  try {
    await productRepository.deleteProduct(req.params.productID);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /products - Retrieves a list of all products
async function getAllProducts(req, res) {
  try {
    const products = await productRepository.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /products?category={category} - Retrieves products by category
async function getProductsByCategory(req, res) {
  try {
    const products = await productRepository.getProductsByCategory(req.query.category);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /products?business={businessID} - Retrieves products associated with a specific business
async function getProductsByBusiness(req, res) {
  try {
    const products = await productRepository.getProductsByBusiness(req.query.business);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /products/virtualTryOn - Retrieves all products that have virtual try-on enabled
// async function getProductsWithVirtualTryOn(req, res) {
//   try {
//     const products = await productRepository.getProductsWithVirtualTryOn();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
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
