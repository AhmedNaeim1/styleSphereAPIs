const reviewRepository = require('../repositories/reviewRepository');

// Controller function to get all reviews
async function getAllReviews(req, res) {
  try {
    const reviews = await reviewRepository.getAllReviews();
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller function to add a review
async function addReview(req, res) {
  try {
    const review = await reviewRepository.addReview(req.body);
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller function to get reviews by product
async function getReviewsByProduct(req, res) {
  try {
    const { productID } = req.params;
    const reviews = await reviewRepository.getReviewsByProduct(productID);
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller function to get reviews by user
async function getReviewsByUser(req, res) {
  try {
    const { userID } = req.params;
    const reviews = await reviewRepository.getReviewsByUser(userID);
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller function to delete a review by reviewID
async function deleteReview(req, res) {
  try {
    const { reviewID } = req.params;
    await reviewRepository.deleteReview(reviewID);
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllReviews,
  addReview,
  getReviewsByProduct,
  getReviewsByUser,
  deleteReview,
};
