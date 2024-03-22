const axios = require("axios");

async function getAllShipments(req, res) {
  try {
    const shipments = await axios.get("http://localhost:8080/shipping/get-shipments");
    res.json(shipments.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteShipment(req, res) {
  try {
    const shippingAddressID = req.params.shippingAddressID;
    const userID = req.params.userID;
    const result = await axios.delete(`http://localhost:8080/shipping/${shippingAddressID}/${userID}`);
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function addShipment(req, res) {
  try {
    const shipment = req.body;
    const result = await axios.post("http://localhost:8080/shipping/add-shipment", shipment);
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getShipment(req, res) {
  try {
    const shippingAddressID = req.params.shippingAddressID;
    const userID = req.params.userID;
    const shipment = await axios.get(`http://localhost:8080/shipping/get-shipment/${shippingAddressID}/${userID}`);
    res.json(shipment.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateShipment(req, res) {
  try {
    const shippingAddressID = req.params.shippingAddressID;
    const userID = req.params.userID;
    const shipment = req.body;
    const result = await axios.put(`http://localhost:8080/shipping/update-shipment/${shippingAddressID}/${userID}`, shipment);
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUserShipments(req, res) {
  try {
    const userID = req.params.userID;
    const shipments = await axios.get(`http://localhost:8080/shipping/get-user-shipments/${userID}`);
    res.json(shipments.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllShipments,
  deleteShipment,
  addShipment,
  getShipment,
  updateShipment,
  getUserShipments,
};
