const express = require("express");
const router = express.Router();
const reviewController = require("../../controllers/socialServiceControllers/reviewController");

router.get("/", reviewController.getAllReviews);
router.post("/", reviewController.addReview);
router.get("/product/:productID", reviewController.getReviewsByProduct);
router.get("/user/:userID", reviewController.getReviewsByUser);
router.delete("/:reviewID", reviewController.deleteReview);

module.exports = router;
