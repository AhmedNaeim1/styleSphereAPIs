const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/:userID", cartController.getAllCartItems);
router.post("/", cartController.addProductToCart);
router.put("/", cartController.updateCartItemQuantity);
router.delete("/:userID/:productID", cartController.removeProductFromCart);

module.exports = router;
