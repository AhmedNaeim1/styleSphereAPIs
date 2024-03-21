const User = require("../model/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

function generateToken(user) {
  return jwt.sign(
    {
      email: user.email,
      userId: user._id,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "365 days",
    }
  );
}

async function signupUser(userData, password) {
  userData.password = password;
  userData._id = new mongoose.Types.ObjectId();
  const user = new User(userData);
  const token = generateToken(user);
  user.token = token;
  await user.save();
  return user;
}

async function loginUser(email, password) {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    return "Invalid email";
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return "Invalid password";
  } else {
    const token = generateToken(user);
    user.token = token;
    await user.save();
    return user;
  }
}

async function logoutUser(userID) {
  const user = await userRepository.getUser(userID);
  user.token = null;
  await user.save();
  return "User logged out successfully";
}

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
};
