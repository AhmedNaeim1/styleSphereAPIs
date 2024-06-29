const axios = require("axios");

async function updateUserPreferences(req, res) {
  try {
    const userID = req.params.userID;
    const user = await axios.put(`http://localhost:3005/user/${userID}/preferences`, req.body);
    res.json(user.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUserPreferences(req, res) {
  try {
    const user = await axios.get(`http://localhost:3005/user/${req.params.userID}/preferences`);
    res.json(user.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  updateUserPreferences,
  getUserPreferences,
};
