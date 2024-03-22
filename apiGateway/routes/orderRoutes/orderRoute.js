const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/orderControllers/orderController");

router.post("/createOrder", orderController.createOrder);
router.get("/getOrder/:orderID", orderController.getOrder);
router.get("/getOrders", orderController.getAllOrders);
router.get("/getUserOrders/:userID", orderController.getUserOrders);
router.put("/updateOrderStatus/:orderID", orderController.updateOrderStatus);
router.delete("/deleteOrder/:orderID", orderController.deleteOrder);
router.get("/getProductOrders/:productID", orderController.getProductOrders);

module.exports = router;
