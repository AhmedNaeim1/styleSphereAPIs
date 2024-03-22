const express = require("express");
const router = express.Router();
const shippingController = require("../../controllers/checkOutControllers/shippingController");

router.get("/getShipments", shippingController.getAllShipments);
router.delete("/:shippingAddressID/:userID", shippingController.deleteShipment);
router.post("/addShipment", shippingController.addShipment);
router.get(
  "/getShipment/:shippingAddressID/:userID",
  shippingController.getShipment
);
router.put(
  "/updateShipment/:shippingAddressID/:userID",
  shippingController.updateShipment
);
router.get("/getUserShipments/:userID", shippingController.getUserShipments);

module.exports = router;
