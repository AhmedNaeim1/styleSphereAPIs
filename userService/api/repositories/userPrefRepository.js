const User = require("../model/User");
const mongoose = require("mongoose");

async function updateUserPreferences(userID, preferences) {
  const user = await User.findByIdAndUpdate(userID, preferences, { new: true });
  return user;
}

async function getUserPreferences(userID) {
  const user = await User.findById(
    userID,
    "preferredStyles preferredMaterials preferredOccasions preferredFits"
  );
  return user;
}

module.exports = {
  updateUserPreferences,
  getUserPreferences,
};
