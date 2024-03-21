// Import necessary modules
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const followController = require("../controllers/followController");
const userPrefController = require("../controllers/userPrefController");

// Define routes for user management
router.get("/:userID", userController.getUser);
router.put("/:userID", userController.updateUser);
router.delete("/:userID", userController.deleteUser);

// Authentication routes
router.post("/signup", authController.signUpUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);

// User preferences routes
router.put("/:userID/preferences", userPrefController.updateUserPreferences);
router.get("/:userID/preferences", userPrefController.getUserPreferences);

// Follow/unfollow routes
router.put("/follow/:userID/:followID", followController.followUserOrBusiness);
router.put(
  "/unfollow/:userID/:followID",
  followController.unfollowUserOrBusiness
);

module.exports = router;
