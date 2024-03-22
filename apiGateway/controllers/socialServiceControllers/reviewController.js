const axios = require('axios');

async function getAllReviews(req, res) {
  try {
    const reviews = await axios.get('http://localhost:3000/reviews');
    res.json(reviews.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function addReview(req, res) {
  try {
    const review = await axios.post('http://localhost:3000/reviews', req.body);
    res.json(review.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller function to get reviews by product
async function getReviewsByProduct(req, res) {
  try {
    const { productID } = req.params;
    const reviews = await axios.get(`http://localhost:3000/reviews/product/${productID}`);
    res.json(reviews.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller function to get reviews by user
async function getReviewsByUser(req, res) {
  try {
    const { userID } = req.params;
    const reviews = await axios.get(`http://localhost:3000/reviews/user/${userID}`);
    res.json(reviews.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller function to delete a review by reviewID
async function deleteReview(req, res) {
  try {
    const { reviewID } = req.params;
    await axios.delete(`http://localhost:3000/reviews/${reviewID}`);    
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
