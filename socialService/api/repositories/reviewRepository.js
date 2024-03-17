const pool = require("../../dbconfig/dbConfig");
const uuid = require("uuid");

function getAllReviews() {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM reviews", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function getReviewsByProduct(productID) {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM reviews WHERE productID = ?", [productID], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function getReviewsByUser(userID) {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM reviews WHERE userID = ?", [userID], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function deleteReview(reviewID) {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM reviews WHERE reviewID = ?", [reviewID], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function addReview(review) {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO reviews (reviewID, userID, productID, rating, comment, reviewDate) VALUES (?, ?, ?, ?, ?, ?)",
      [
        uuid.v4().replace(/-/g, ""),
        review.userID,
        review.productID,
        review.rating,
        review.comment,
        review.reviewDate,
      ],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

module.exports = {
  getAllReviews,
  getReviewsByProduct,
  getReviewsByUser,
  deleteReview,
  addReview,
};
