const authRepository = require("../repositories/authRepository");
const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");

async function signUpUser(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser) {
      return res.json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await authRepository.signupUser(req.body, hashedPassword);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function loginUser(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await authRepository.loginUser(email, password);

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function logoutUser(req, res) {
  try {
    const user = await authRepository.logoutUser(req.body.userID);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  signUpUser,
  loginUser,
  logoutUser,
};
