const pool = require("../../dbconfig/dbConfig");
const uuid = require("uuid");

async function getAllCartItems(userID) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM cart WHERE UserID = ?";
    pool.query(query, [userID], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function addProductToCart(userID, productID, quantity, addedDate, price) {
  return new Promise((resolve, reject) => {
    const checkQuery = "SELECT * FROM cart WHERE UserID = ? AND ProductID = ?";
    pool.query(checkQuery, [userID, productID], (checkErr, checkResult) => {
      if (checkErr) {
        reject(checkErr);
      } else {
        if (checkResult.length > 0) {
          resolve({ message: "Product already exists in the cart" });
        } else {
          const insertQuery =
            "INSERT INTO cart (CartID, UserID, ProductID, Quantity, AddedDate, Price) VALUES (?, ?, ?, ?, ?, ?)";
          pool.query(
            insertQuery,
            [
              uuid.v4().replace(/-/g, ""),
              userID,
              productID,
              quantity,
              addedDate,
              price,
            ],
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve({
                  userID,
                  productID,
                  quantity,
                  addedDate,
                  price,
                });
              }
            }
          );
        }
      }
    });
  });
}

async function updateCartItemQuantity(userID, productID, quantity) {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE cart SET Quantity = ? WHERE UserID = ? AND ProductID = ?";
    pool.query(query, [quantity, userID, productID], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({ userID, productID, quantity });
      }
    });
  });
}

async function removeProductFromCart(userID, productID) {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM cart WHERE UserID = ? AND ProductID = ?";
    pool.query(query, [userID, productID], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({ message: "Product removed from cart successfully" });
      }
    });
  });
}


module.exports = {
  getAllCartItems,
  addProductToCart,
  updateCartItemQuantity,
  removeProductFromCart,
};


