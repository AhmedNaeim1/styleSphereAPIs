const axios = require("axios");
const { body } = require("express-validator");
const https = require("https");

const agent = new https.Agent({ rejectUnauthorized: false });
async function getAllBusinesses(req, res) {
  try {
    const result = await axios.get(
      "https://localhost:7218/business/allBusinesses",
      { httpsAgent: agent }
    );
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getBusiness(req, res) {
  try {
    const id = req.params.id;
    const result = await axios.get(`https://localhost:7218/business/${id}`, {
      httpsAgent: agent,
    });
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createBusiness(req, res) {
  try {
    console.log(req.body.userID);
    const result = await axios.post(
      "https://localhost:7218/business/createBusiness",
      req.body,
      { httpsAgent: agent }
    );
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateBusiness(req, res) {
  try {
    const id = req.params.id;
    const result = await axios.put(
      `https://localhost:7218/business/updateBusiness/${id}`,
      req.body,
      { httpsAgent: agent }
    );
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteBusiness(req, res) {
  try {
    const id = req.params.id;
    const result = await axios.delete(
      `https://localhost:7218/business/deleteBusiness/${id}`,
      { httpsAgent: agent }
    );
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllBusinesses,
  getBusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness,
};
