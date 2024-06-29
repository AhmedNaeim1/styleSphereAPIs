const axios = require("axios");
const https = require("https");

const agent = new https.Agent({ rejectUnauthorized: false });

async function getAllBusinesses(req, res) {
  try {
    const result = await axios.get("https://localhost:7218/business/allBusinesses", { httpsAgent: agent });
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getBusiness(req, res) {
  try {
    const id = req.params.id;
    const result = await axios.get(`https://localhost:7218/business/${id}`, { httpsAgent: agent });
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createBusiness(req, res) {
  try {
    const existingBusiness = await axios.get(`https://localhost:7218/business/${req.body.businessID}`, { httpsAgent: agent });
    if (existingBusiness.data) {
      return res.status(409).json({ error: "Business already exists." });
    }

    const result = await axios.post("https://localhost:7218/business/createBusiness", req.body, { httpsAgent: agent });
    res.status(201).json({ message: "Successfully created." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateBusiness(req, res) {
  try {
    const id = req.params.id;
    if (id !== req.body.businessID) {
      return res.status(400).json({ error: "Business ID mismatch." });
    }

    const existingBusiness = await axios.get(`https://localhost:7218/business/${id}`, { httpsAgent: agent });
    if (!existingBusiness.data) {
      return res.status(404).json({ error: "Business not found." });
    }

    await axios.put(`https://localhost:7218/business/updateBusiness/${id}`, req.body, { httpsAgent: agent });
    res.json({ message: "Successfully updated." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteBusiness(req, res) {
  try {
    const id = req.params.id;
    const existingBusiness = await axios.get(`https://localhost:7218/business/${id}`, { httpsAgent: agent });
    if (!existingBusiness.data) {
      return res.status(404).json({ error: "Business not found." });
    }

    await axios.delete(`https://localhost:7218/business/deleteBusiness/${id}`, { httpsAgent: agent });
    res.json({ message: "Successfully deleted." });
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
