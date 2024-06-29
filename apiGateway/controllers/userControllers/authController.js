const axios = require("axios");

async function signUpUser(req, res) {
  try {
    const result = await axios.post("http://localhost:3005/user/signup", req.body);
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function loginUser(req, res) {
  try {
    const user = await axios.post("http://localhost:3005/user/login", req.body);
    res.json(user.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function logoutUser(req, res) {
  try {
    const user = await axios.post("http://localhost:3005/user/logout", req.body);
    res.json(user.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function changePassword(req, res) {
  try {
    const result = await axios.put(`http://localhost:3005/user/${req.params.userID}/changePassword`, req.body);
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function userOTPSending(req, res) {
  try {
    const result = await axios.post("http://localhost:3005/user/userOTPSending", req.body);
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function userOTPVerification(req, res) {
  try {
    const result = await axios.post("http://localhost:3005/user/userOTPVerification", req.body);
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  signUpUser,
  loginUser,
  logoutUser,
  changePassword,
  userOTPSending,
  userOTPVerification,
};
