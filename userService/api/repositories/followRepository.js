const User = require("../model/User");
const mongoose = require("mongoose");
const userRepository = require("../repositories/userRepository");

async function updateUserCount(userId, countType, increment) {
  try {
    const user = await userRepository.getUser(userId);
    user[countType] += increment ? 1 : -1;
    await user.save();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update user count");
  }
}

async function followUserOrBusiness(userID, followID) {
  try {
    await updateUserCount(userID, "followingCount", true);
    await updateUserCount(followID, "followersCount", true);

    return "User followed successfully";
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
}

async function unfollowUserOrBusiness(userID, followID) {
  try {
    await updateUserCount(userID, "followingCount", false);
    await updateUserCount(followID, "followersCount", false);
    return "User unfollowed successfully";
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
}

module.exports = {
  followUserOrBusiness,
  unfollowUserOrBusiness,
};
