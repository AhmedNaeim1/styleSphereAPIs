const axios = require("axios");

async function getAllPayments(req, res) {
  try {
    const payments = await axios.get("http://localhost:8080/payments/get-payments");
    res.json(payments.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deletePayment(req, res) {
  try {
    const paymentMethodID = req.params.paymentMethodID;
    const userID = req.params.userID;
    const result = await axios.delete(`http://localhost:8080/payments/${paymentMethodID}/${userID}`);
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function addPayment(req, res) {
  try {
    const payment = req.body;
    const result = await axios.post("http://localhost:8080/payments/add-payment", payment);
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPayment(req, res) {
  try {
    const paymentMethodID = req.params.paymentMethodID;
    const userID = req.params.userID;
    const payment = await axios.get(`http://localhost:8080/payments/get-payment/${paymentMethodID}/${userID}`);
    res.json(payment.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updatePayment(req, res) {
  try {
    const paymentMethodID = req.params.paymentMethodID;
    const userID = req.params.userID;
    const payment = req.body;
    const result = await axios.put(`http://localhost:8080/payments/update-payment/${paymentMethodID}/${userID}`, payment);
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUserPayments(req, res) {
  try {
    const userID = req.params.userID;
    const payments = await axios.get(`http://localhost:8080/payments/get-user-payment/${userID}`);
    res.json(payments.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllPayments,
  deletePayment,
  addPayment,
  getPayment,
  updatePayment,
  getUserPayments,
};
