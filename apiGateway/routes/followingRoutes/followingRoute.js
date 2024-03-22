const express = require("express");
const router = express.Router();
const followingController = require("../../controllers/followingControllers/followingController");

router.post("/follow", followingController.createFollowing);
router.delete("/unfollow", followingController.unfollow);
router.get("/followers/:followerID", followingController.getUserFollowers);
router.get("/followed/:followedID", followingController.getUserFollowed);
router.get("/exists", followingController.isFollowingExists);

module.exports = router;
