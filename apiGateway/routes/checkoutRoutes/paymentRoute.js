const express = require("express");
const router = express.Router();
const paymentController = require("../../controllers/checkOutControllers/paymentController");

router.get("/getPayments", paymentController.getAllPayments);
router.delete("/:paymentMethodID/:userID", paymentController.deletePayment);
router.post("/addPayment", paymentController.addPayment);
router.get("/getPayment/:paymentMethodID/:userID", paymentController.getPayment);
router.put("/updatePayment/:paymentMethodID/:userID", paymentController.updatePayment);
router.get("/getUserPayment/:userID", paymentController.getUserPayments);

module.exports = router;
