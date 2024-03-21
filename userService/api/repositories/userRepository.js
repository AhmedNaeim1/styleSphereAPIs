const User = require("../model/User");
const mongoose = require("mongoose");

async function getUser(userID) {
  try {
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      throw new Error("Invalid userID format");
    }
    const user = await User.findById(userID);
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser(userID, userData) {
  try {
    const user = await User.findByIdAndUpdate(userID, userData, { new: true });
    return user;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(userID) {
  try {
    await User.findByIdAndDelete(userID);
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};
