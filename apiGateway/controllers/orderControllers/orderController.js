const express = require("express");
const router = express.Router();
const axios = require("axios");

async function createOrder(req, res) {
  try {
    const result = await axios.post("http://127.0.0.1:5001/create-order", req.body);
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getOrder(req, res) {
  try {
    const orderID = req.params.orderID;
    const order = await axios.get(`http://127.0.0.1:5001/get-order/${orderID}`);
    res.json(order.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllOrders(req, res) {
  try {
    const orders = await axios.get("http://127.0.0.1:5001/get-orders");
    res.json(orders.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUserOrders(req, res) {
  try {
    const userID = req.params.userID;
    const orders = await axios.get(`http://127.0.0.1:5001/get-user-orders/${userID}`);
    res.json(orders.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const orderID = req.params.orderID;
    const status = req.body.status;
    const result = await axios.put(`http://127.0.0.1:5001/update-order-status/${orderID}`, req.body);
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteOrder(req, res) {
  try {
    const orderID = req.params.orderID;
    const result = await axios.delete(`http://127.0.0.1:5001/delete-order/${orderID}`);
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getProductOrders(req, res) {
  try {
    const productID = req.params.productID;
    const orders = await axios.get(`http://127.0.0.1:5001/get-product-orders/${productID}`);
    res.json(orders.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createOrder,
  getOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
  getProductOrders,
};
