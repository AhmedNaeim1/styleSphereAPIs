const cartRepository = require('../repositories/cartRepository');

async function getAllCartItems(req, res) {
  try {
    const { userID } = req.params;
    const cartItems = await cartRepository.getAllCartItems(userID);
    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function addProductToCart(req, res) {
    try {
      const { userID, productID, quantity, addedDate, price } = req.body;
      const newCartItem = await cartRepository.addProductToCart(userID, productID, quantity, addedDate, price);
      res.json(newCartItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
async function updateCartItemQuantity(req, res) {
    try {
      const { userID, productID, quantity } = req.body;
      const updatedCartItem = await cartRepository.updateCartItemQuantity(userID, productID, quantity);
      res.json(updatedCartItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

async function removeProductFromCart(req, res) {
  try {
    const { userID, productID } = req.params;
    await cartRepository.removeProductFromCart(userID, productID);
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
