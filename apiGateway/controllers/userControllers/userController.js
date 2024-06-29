const axios = require("axios");

async function getUser(req, res) {
  try {
    console.log(req.params.userID);
    const user = await axios.get(`http://localhost:3005/user/${req.params.userID}`);
    res.json(user.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateUser(req, res) {
  try {
    const userID = req.params.userID;
    const user = await axios.put(`http://localhost:3005/user/${userID}`, req.body);
    res.json(user.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteUser(req, res) {
  try {
    await axios.delete(`http://localhost:3005/user/${req.params.userID}`);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getUser,
  updateUser,
  deleteUser,
};
