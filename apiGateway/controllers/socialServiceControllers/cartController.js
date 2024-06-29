const axios = require('axios');

async function getAllCartItems(req, res) {
  try {
    const { userID } = req.params;
    const cartItems = await axios.get(`http://localhost:3000/cart/${userID}`);
    res.json(cartItems.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function addProductToCart(req, res) {
  try {
    const newCartItem = await axios.post('http://localhost:3000/cart', req.body);
    res.json(newCartItem.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateCartItemQuantity(req, res) {
  try {
    const updatedCartItem = await axios.put('http://localhost:3000/cart', req.body);
    res.json(updatedCartItem.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function removeProductFromCart(req, res) {
  try {
    const { userID, productID } = req.params;
    await axios.delete(`http://localhost:3000/cart/${userID}/${productID}`);
    res.json({ message: 'Product removed from cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllCartItems,
  addProductToCart,
  updateCartItemQuantity,
  removeProductFromCart,
};
