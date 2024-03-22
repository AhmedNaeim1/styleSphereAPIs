const axios = require("axios");

async function createFollowing(req, res) {
  try {
    const result = await axios.post("http://127.0.0.1:5010/follow", req.body);
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function unfollow(req, res) {
  try {
    const { followerID, followedID } = req.body;
    const result = await axios.delete("http://127.0.0.1:5010/unfollow", {
      headers: {
        "Content-Type": "application/json",
      },
      data: req.body,
    });
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUserFollowers(req, res) {
  try {
    const followerID = req.params.followerID;
    const result = await axios.get(
      `http://127.0.0.1:5010/followings/followers/${followerID}`
    );
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUserFollowed(req, res) {
  try {
    const followedID = req.params.followedID;
    const result = await axios.get(
      `http://127.0.0.1:5010/followings/followed/${followedID}`
    );
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function isFollowingExists(req, res) {
  try {
    const result = await axios.get("http://127.0.0.1:5010/exists", {
      headers: {
        "Content-Type": "application/json",
      },
      data: req.body, // Pass request body as data
    });
    res.json(result.data); // Send the response data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createFollowing,
  unfollow,
  getUserFollowers,
  getUserFollowed,
  isFollowingExists,
};
