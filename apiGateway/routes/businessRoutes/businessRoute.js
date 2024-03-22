const express = require("express");
const router = express.Router();
const businessController = require("../../controllers/businessControllers/businessController");

router.get("/allBusinesses", businessController.getAllBusinesses);
router.get("/:id", businessController.getBusiness);
router.post("/createBusiness", businessController.createBusiness);
router.put("/updateBusiness/:id", businessController.updateBusiness);
router.delete("/deleteBusiness/:id", businessController.deleteBusiness);

module.exports = router;
