const axios = require("axios");

async function followUserOrBusiness(req, res) {
  try {
    const userID = req.params.userID;
    const followID = req.params.followID;
    const user = await axios.put( `http://localhost:3005/user/follow/${userID}/${followID}`);
    res.status(201).json({ message: "User followed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function unfollowUserOrBusiness(req, res) {
  try {
    const userID = req.params.userID;
    const followID = req.params.followID;
    const user = await axios.put(`http://localhost:3005/user/unfollow/${userID}/${followID}`);
    res.json(user.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  followUserOrBusiness,
  unfollowUserOrBusiness,
};
